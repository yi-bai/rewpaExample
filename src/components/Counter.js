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
                <span onClick={() => dispatch({ path, type: 'INCREMENT' })}>+</span>
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
    count: 0
  },
  reducer: (state, action, runActions) => {
    switch(action.type){
      case 'INCREMENT':
        return { count: state.count + 1 };
      case 'DECREMENT':
        return { count: state.count - 1 };
      default:
        return state;
    }
  }
});
export default CounterContainer;
