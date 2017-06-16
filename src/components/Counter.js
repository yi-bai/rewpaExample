import React from 'react';
import { connect } from 'react-redux';
import Actions from '../async/Actions';
import { joinPath, getPath, createRewpa } from '../../../rewpa/src/index';
import axios from 'axios';
import _ from 'lodash';

// Component
class Counter extends React.Component {
    constructor(){
        super();
    }

    render(){
      console.log(this.props);
      const { dispatch, path } = this.props;
      return (
            <div>
                <span onClick={() => dispatch({ path, type: 'DECREMENT' })}>-</span>
                { this.props.count }
                { this.props.isLoading ? 'loading...' : '' }
                <span onClick={() => dispatch({ path, type: 'INCREMENT' })}>+</span>
                <span onClick={() => dispatch({ path, type: 'INCREMENT_EFFECTS_A' })}> +ASYNC</span>
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
    INCREMENT_EFFECTS_A: async function({ path }, dispatch, getState) {
      return dispatch({ path, type: 'INCREMENT_EFFECTS' })
      .then(() => dispatch({ path, type: 'INCREMENT_CALLED++' }));
    },
    INCREMENT_EFFECTS: _.throttle(({ path }, dispatch, getState) => {
      dispatch({ path, type: 'isLoading/_SET', payload: true });
      dispatch({ path, type: 'THROTTLE_CALLED++', payload: true });
      return axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        console.log(response);
        dispatch({ path, type: 'INCREMENT' });
        dispatch({ path, type: 'isLoading/_SET', payload: false });
        return response.data.length;
      });
    }, 10000)
  },
  reducer: {
    INCREMENT(state, action) { return _.assign({}, state, { count: state.count + (action.payload || 1) })  },
    DECREMENT(state, action) { return _.assign({}, state, { count: state.count - (action.payload || 1) }) },
    'INCREMENT_CALLED++': (state, action) =>
      { return _.assign({}, state, { increment_called: state.increment_called+1 })},
    'THROTTLE_CALLED++': (state, action) =>
      { return _.assign({}, state, { throttle_called: state.throttle_called+1 })},
  }
})
export default CounterContainer;
