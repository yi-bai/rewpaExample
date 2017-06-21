import { createRewpa, getPath } from '../../../rewpa/src/index';
import Rx from 'rxjs';
import axios from 'axios';
import asStream from './utils/asStream';
import DateRewpa from './Date';

const getSunriseMock = (latitude, longitude, date) => {
  return { sunrise: Math.random(), sunfall: Math.random(), moonrise: Math.random(), moonfall: Math.random() };
};

export default createRewpa({
  name: 'Sunrise',
  schema: {
    isOpen: false,
    latitude: 0,
    longitude: 0,
    date: DateRewpa,
    times:{
      sunrise: '--:--',
      sunfall: '--:--',
      moonrise: '--:--',
      moonfall: '--:--'
    }
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
    },
    _ON_CHANGE: ({ path, payload: { prevState } }, dispatch, getState) => {
      const nextState = getPath(getState(), path); prevState = getPath(prevState, path);
      if(nextState.date !== prevState.date){
        const { latitude, longitude, date } = nextState;
        dispatch({ type: `${path}.times/_ASSIGN`, payload: getSunriseMock(latitude, longitude, date)});
      }
    }
  },
  reducer: {
    INIT: (state, { payload: { latitude, longitude } }, put) => {
      return put({ type: 'times/_ASSIGN', payload: getSunriseMock(latitude, longitude, state.date) },
        { type: '/_ASSIGN', payload: {latitude, longitude} });
    }
  }
});
