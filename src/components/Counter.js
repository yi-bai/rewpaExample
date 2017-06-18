import React from 'react';
import { connect } from 'react-redux';
import Actions from '../async/Actions';
import { joinPath, getPath, createRewpa } from '../../../rewpa/src/index';
import axios from 'axios';
import _ from 'lodash';
import Rx from 'rxjs';

// Component
class Counter extends React.Component {
    constructor(){
        super();
        this.increment = this.increment.bind(this);
        this.subject = new Rx.Subject();
        this.another = this.subject.switchMap(() => Rx.Observable.fromPromise(this.increment()));
        this.another.subscribe((promise) => console.log(promise));
    }

    increment(){
      const { dispatch, path } = this.props;
      return dispatch({ path, type: 'INCREMENT_EFFECTS' });
    }

    hehe(){
      // this.subject.next(Math.random());
      const someFunction = function(callback){
        callback(1,2,3);
      }

      someFunction((a, b, c) => {
        console.log(a); // 5
        console.log(b); // 'some string'
        console.log(c); // {someProperty: 'someValue'}
      });

      const boundSomeFunction = Rx.Observable.bindCallback(someFunction);
      console.log(boundSomeFunction);
      boundSomeFunction().subscribe(values => {
        console.log(values) // [5, 'some string', {someProperty: 'someValue'}]
      });
    }

    render(){
      const { dispatch, path } = this.props;
      return (
            <div>
                <span onClick={() => dispatch({ path, type: 'DECREMENT' })}>-</span>
                { this.props.count }
                { this.props.isLoading ? 'loading...' : '' }
                <span onClick={() => dispatch({ path, type: 'INCREMENT' })}>+</span>
                <span onClick={() => dispatch({ path, type: 'STREAM' })}> +ASYNC</span>
                <span onClick={() => dispatch({ path, type: 'count/_SET', payload: 0 })}>Clear</span>
                <span onClick={() => this.props.removeCounter()}>Remove</span>
                { this.props.increment_called }, { this.props.throttle_called }
            </div>
        );
    }
}

// Data
const mapStateToProps = (state, { path }) => {
    return getPath(state, path);
}

// Actions, Effects
const mapDispatchToProps = (dispatch, { path }) => {
    return { dispatch };
}

const asStream = (epic, options) => {
  const streamMaps = {};
  options = options || { autoSubscribe: true };
  return (action, dispatch, getState) => {
    if(!(action.path in streamMaps)){
      console.log('inside creating asStream');
      streamMaps[action.path] = {};
      streamMaps[action.path].input = new Rx.Subject();
      streamMaps[action.path].output = epic(streamMaps[action.path].input, dispatch, getState);
      if(options.autoSubscribe) streamMaps[action.path].output.subscribe(dispatch);
    }
    streamMaps[action.path].input.next(action);
    return streamMaps[action.path].output;
  };
}

// Reducer
const CounterContainer = connect(mapStateToProps, mapDispatchToProps)(Counter);
CounterContainer.rewpa = createRewpa({
  name: 'Counter',
  schema: {
    count: 0,
    increment_called: 0,
    throttle_called: 0,
    isLoading: false
  },
  effects: {
    STREAM: asStream((action$, dispatch, getState) => {
      return action$
      .switchMap(({ path }) => Rx.Observable.fromPromise(dispatch({ path, type: 'INCREMENT_EFFECTS' })));
    }),
    INCREMENT_EFFECTS_A: async function({ path }, dispatch, getState) {
      return dispatch({ path, type: 'INCREMENT_EFFECTS' })
      .then(() => dispatch({ path, type: 'INCREMENT_CALLED++' }));
    },
    INCREMENT_EFFECTS: (action, dispatch, getState) => {
      dispatch({ path: action.path, type: 'isLoading/_SET', payload: true });
      return axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => new Promise((resolve, reject) => { setTimeout(() => resolve(response), 3000); }))
      .then((response) => {
        return { path: action.path, type: 'INCREMENT_FINISH', payload: response.data.length };
      });
    },
    INCREMENT_FINISH: (action, dispatch, getState) => {
      dispatch({ path: action.path, type: 'INCREMENT', payload: action.payload });
      dispatch({ path: action.path, type: 'isLoading/_SET', payload: false });
    }
  },
  reducer: {
    INCREMENT(state, action) { return _.assign({}, state, { count: state.count + (action.payload || 1) })  },
    DECREMENT(state, action) { return _.assign({}, state, { count: state.count - (action.payload || 1) }) }
  }
})
export default CounterContainer;
