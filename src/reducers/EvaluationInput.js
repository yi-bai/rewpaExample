import { createRewpa, getPath } from '../../../rewpa/src/index';
import Rx from 'rxjs';
import axios from 'axios';
import asStream from './utils/asStream';

const evaluationNumberInput = createRewpa({
  schema: 1,
  reducer: {
    SET: (state, { payload }, put) => {
      console.log(payload);
      return put({ type: '/_SET', payload: Math.min(Math.max(payload, 1), 3)});
    }
  }
})

export default createRewpa({
  name: 'EvaluationInput',
  schema: {
    isInputting: false,
    inputStage: 0,
    point1: evaluationNumberInput,
    point2: evaluationNumberInput,
    point3: evaluationNumberInput
  },
  effects: {
    SUBMIT: ({ path, payload }, dispatch, getState) => {
      const evaluationInputValue = getPath(getState(), path);
      const accessoryInputValue = getPath(getState(), payload.pathAccessoryInput);
      dispatch({ type: `${path}.inputStage/_SET`, payload: 1 });
      return Promise.all([
        axios.post('http://localhost:8080/api/v1/locations/31/evaluation', evaluationInputValue),
        axios.post('http://localhost:8080/api/v1/locations/31/accessories', accessoryInputValue)])
      .then((responses) => {
        return dispatch({ type: 'location/INIT' });
      })
      .then((response) => {
        setTimeout(() => {
          dispatch({ type: `${path}.inputStage/_SET`, payload: 0 });
          dispatch({ type: `${path}.isInputting/_SET`, payload: false });
        }, 3000);
      });
    }
  },
  reducer: {
    TOGGLE_INPUT: (state, action, put) => {
      return put({ type: 'isInputting/_SET', payload: !state.isInputting });
    },
    UPDATE: (state, { payload }, put) => {
      return put({ type: '/_ASSIGN', payload });
    }
  }
});
