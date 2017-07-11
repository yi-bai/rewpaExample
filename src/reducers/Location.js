import { createRewpa } from '../../../rewpa/src/index';
import Rx from 'rxjs';
import axios from 'axios';
import asStream from './utils/asStream';
import { routerReducer } from 'react-router-redux';
import LocationRewpa from './Location';

export default createRewpa({
  name: 'Location',
  schema: {
    evaluation: {
      point1: 0,
      point2: 0,
      point3: 0
    },
    accessories: [{
      id: null,
      accessory: ''
    }],
    isLoading: false
  },
  effects: {
    /*INIT: ({ path }, dispatch, getState) => {
      dispatch({ path, type: 'isLoading/_SET', payload: true });
      return axios.get('http://localhost:8080/api/v1/locations/31')
      .then((response) =>{
        dispatch({ path, type: 'isLoading/_SET', payload: false });
        dispatch({ path, type: '_ASSIGN', payload: response.data.data });
        return response.data.data;
      })
      .catch(() => {
        dispatch({ path, type: 'isLoading/_SET', payload: false });
        dispatch({ type: 'popup/_SET', payload: { message: 'error' }});
      });
    },*/
    _AFTER_ACTION: ({ payload }, dispatch, getState) => {
      console.log(payload.action, 'location after action called');
    }
  },
  observables: (action$, { dispatch, getState }) => {
    console.log(action$);
    return action$
    .filter((action) => action.type === 'location/INIT')
    .do((action) => console.log(action, 'observablessss'))
    .mapTo({ type: 'evaluation.point2/_SET', payload: 666 });
  },
  reducer: {}
});
