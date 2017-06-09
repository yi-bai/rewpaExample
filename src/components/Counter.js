import React from 'react';
import { connect } from 'react-redux';
import Actions from '../async/Actions';
import { joinPath, connectWithPath, createRewpa } from '../../../rewpa/src/index';

// Component
class Counter extends React.Component {
    constructor(){
        super();
    }

    render(){
        console.log(this.props.path);
    	return (
            <div>
                <span onClick={() => this.props.decrement()}>-</span>
                { this.props.count }
                <span onClick={() => this.props.increment()}>+</span>
                <span onClick={() => this.props.clear()}>Clear</span>
                <span onClick={() => this.props.removeCounter()}>Remove</span>
            </div>
        );
    }
}

// Actions
const mapStateToProps = (state, ownProps) => {
    return {};
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        increment: () => dispatch({ type: `increment` }),
        decrement: () => dispatch({ type: `decrement` }),
        clear: () => dispatch({ type: '_ASSIGN', payload: { count: 0 } })
    };
}

// Reducer
const CounterContainer = connectWithPath(connect)(mapStateToProps, mapDispatchToProps)(Counter);
CounterContainer.rewpa = createRewpa({
  name: 'Counter',
  schema: {
    count: 0
  },
  reducer: (state, action, runActions) => {
    switch(action.type){
      case 'increment':
        return { count: state.count + 1 };
      case 'decrement':
        return { count: state.count - 1 };
      default:
        return state;
    }
  }
});
export default CounterContainer;
