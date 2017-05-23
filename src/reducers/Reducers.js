import {combineReducers} from 'redux';
import { createRewpa } from 'rewpa';

const counterRewpa = createRewpa(
  'Counter',
  {
    count: 0
  },
  (state, action, runActions) => {
    switch(action.type){
      case 'increment':
        return { count: state.count + 1 };
      case 'decrement':
        return { count: state.count - 1 };
      default:
        return state;
    }
  }
);

const rewpa = createRewpa(
  {
    countersA: [counterRewpa],
    countersB: [counterRewpa]
  }
);

export default rewpa;
