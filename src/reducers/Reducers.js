import {combineReducers} from 'redux';
import { createRewpa } from '../../../rewpa/src/index';
import _ from 'lodash';

const confirmBox = createRewpa({
  name: 'ConfirmBox',
  schema: {
    acceptAction: null,
    isOpen: false
  },
  reducer: (state, action, runActions) => {
    switch(action.type){
      case 'open':
        return _.assign({}, state, { acceptAction: action.payload.acceptAction, isOpen: true });
      case 'close':
        return _.assign({}, state, { isOpen: false });
      default:
        return state;
    }
  }
});

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
    countersB: [counterRewpa],
    counterC: counterRewpa,
    confirmBox: confirmBox
  }
});

export default rewpa;
