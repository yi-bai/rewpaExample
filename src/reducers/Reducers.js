import {combineReducers} from 'redux';
import { createRewpa } from '../../../rewpa/src/index';

const counterRewpa = createRewpa({
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

const rewpa = createRewpa({
  schema: {
    countersA: [counterRewpa],
    countersB: [counterRewpa]
  }
});

export default rewpa;
