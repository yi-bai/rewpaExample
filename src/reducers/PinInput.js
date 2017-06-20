import { createRewpa, getPath } from '../../../rewpa/src/index';
import Rx from 'rxjs';
import axios from 'axios';
import asStream from './utils/asStream';

export default createRewpa({
  name: 'PinInput',
  schema: {
    isLoading: false,
    isInputting: false,
    latitude: 0,
    longitude: 0
  },
  effects: {
    CREATE_PIN: ({ path, payload }, dispatch, getState) => {
      dispatch({ type: `${path}.isLoading/_SET`, payload: true });
      return axios.post('http://localhost:8080/api/v1/pins', getPath(getState(), path))
      .then((response) => {
        dispatch({ type: `${path}.isLoading/_SET`, payload: false });
        dispatch({ type: `${path}/_ASSIGN`, payload: { latitude: 0, longitude: 0 }});
      })
      .catch((response) => {
        dispatch({ type: `${path}.isLoading/_SET`, payload: false });
        console.log('error handling here');
      })
    }
  },
  reducer: {
    INIT: (state, { payload }, put) => {
      return put({ type: '/_ASSIGN', payload });
    },
    TOGGLE_INPUT: (state, action, put) => {
      return put({ type: 'isInputting/_SET', payload: !state.isInputting });
    }
  }
});
