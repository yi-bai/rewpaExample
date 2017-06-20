import { createRewpa } from '../../../rewpa/src/index';
import Rx from 'rxjs';
import axios from 'axios';
import asStream from './utils/asStream';

export default createRewpa({
  name: 'Counter',
  schema: {
    count: 0,
    isLoading: false
  },
  effects: {
    STREAM: asStream((action$, dispatch, getState) => {
      return action$
      .switchMap(({ path }) => Rx.Observable.fromPromise(dispatch({ path, type: 'INCREMENT_EFFECTS' })));
    }),
    INCREMENT_EFFECTS: (action, dispatch, getState) => {
      dispatch({ path: action.path, type: 'isLoading/_SET', payload: true });
      return axios.get('http://localhost:8080/api/v1/locations/31')
      .then((response) => new Promise((resolve, reject) => { setTimeout(() => resolve(response), 3000); }))
      .then((response) => {
        return { path: action.path, type: 'INCREMENT_FINISH', payload: response.data.length };
      })
      .catch((error) => {
        return { path: action.path, type: 'INCREMENT_ERROR', payload: error };
      });
    },
    INCREMENT_FINISH: (action, dispatch, getState) => {
      dispatch({ path: action.path, type: 'INCREMENT', payload: action.payload });
      dispatch({ path: action.path, type: 'isLoading/_SET', payload: false });
    },
    INCREMENT_ERROR: (action, dispatch, getState) => {
      dispatch({ path: action.path, type: 'isLoading/_SET', payload: false });
    }
  },
  reducer: {
    INCREMENT(state, action) { return _.assign({}, state, { count: state.count + (action.payload || 1) }) },
    DECREMENT(state, action) { return _.assign({}, state, { count: state.count - (action.payload || 1) }) }
  }
});
