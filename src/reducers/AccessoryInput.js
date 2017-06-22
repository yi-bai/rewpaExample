import { createRewpa, getPath } from '../../../rewpa/src/index';
import { routerReducer } from 'react-router-redux';
import AccessoryRewpa from './Accessory';

import axios from 'axios';

export default createRewpa({
  schema: [AccessoryRewpa],
  effects: {
    INSERT: ({ path, payload }, dispatch, getState) => {
      return axios.post('http://localhost:8080/api/v1/accessories', payload)
      .then((response) => {
        const data = response.data.data;
        if(getPath(getState(), path).some((e) => e.id === data.id)) return;
        dispatch({ type: `${path}/_INSERT`, payload: data });
      });
    }
  },
  reducer: {}
});
