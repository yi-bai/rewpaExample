import { createRewpa } from '../../../rewpa/src/index';
import { routerReducer } from 'react-router-redux';

const taskRewpa = createRewpa({
  schema: {
    name: '',
    isCompleted: false
  }
});

const paginationRewpa = createRewpa({
  schema: {
    page: 1,
    countPerPage: 10,
    totalCount: 0
  }
});

export default createRewpa({
  schema: {
    tasks:{
      list: [taskRewpa],
      pagination: paginationRewpa
    },
    input:{
      inputValue: '',
      suggestions: [''],
      filter: 'all'
    },
    routing: routerReducer
  },
  effects: {
    'input/SUBMIT': (action, dispatch, getState) => {
      const task = { name: getState().input.inputValue, isCompleted: false };
      dispatch({ type: 'tasks.list/_INSERT', payload: task });
      dispatch({ type: 'input.inputValue/_SET', payload: ''});
    },
    'tasks.list/CLEAR_COMPLETED': (action, dispatch, getState) => {
      dispatch({ type: 'tasks.list/_DELETE', payload: { isCompleted: true }});
    }
  },
  reducer: {}
});
