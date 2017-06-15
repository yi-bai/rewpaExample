import React from 'react';
import { connect } from 'react-redux';
import Actions from '../async/Actions';
import { joinPath, getPath, createRewpa } from '../../../rewpa/src/index';

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
                <span onClick={() => dispatch({ path, type: 'INCREMENT_EFFECTS' })}> +ASYNC</span>
                <span onClick={() => dispatch({ path, type: 'count/_SET', payload: 0 })}>Clear</span>
                <span onClick={() => this.props.removeCounter()}>Remove</span>
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
    isLoading: false
  },
  effects: {
    INCREMENT_EFFECTS({ path }, dispatch, getState) {
      dispatch({ path, type: 'isLoading/_SET', payload: true });
      new Promise((resolve, reject) => {
        const res = () => resolve(Math.random()*500);
        setTimeout(res, Math.random()*3000);
      })
      .then((response) => {
        dispatch({ path, type: 'INCREMENT', payload: response });
        dispatch({ path, type: 'isLoading/_SET', payload: false });
      });
    }
  },
  reducer: {
    INCREMENT(state, action) { return _.assign({}, state, { count: state.count + (action.payload || 1) })  },
    DECREMENT(state, action) { return _.assign({}, state, { count: state.count - 1 }) }
  }
})
export default CounterContainer;
