import { createRewpa } from '../../../rewpa/src/index';
import { routerReducer } from 'react-router-redux';
import LocationRewpa from './Location';
import PinInputRewpa from './PinInput';
import SunriseRewpa from './Sunrise';

import LocationDetail from '../components/LocationDetail';

export default createRewpa({
  schema: {
    location: LocationRewpa,
    pinInput: PinInputRewpa,
    sunrise: SunriseRewpa,
    routing: routerReducer,
    ui: LocationDetail.rewpa,
    isLoading: false
  },
  effects: {
    INIT: ({ path }, dispatch, getState) => {
      dispatch({ type: `${path}.isLoading/_SET`, payload: true });
      return dispatch({ path, type: 'location/INIT' })
      .then((response) => {
        const { latitude, longitude } = response;
        dispatch({ type: `${path}.isLoading/_SET`, payload: false });
        dispatch({ type: `${path}.reviews/INIT` });
        dispatch({ type: `${path}.followers/INIT` });
        dispatch({ type: `${path}.weatherReport/INIT` });
        dispatch({ type: `${path}.photos/INIT` });
        dispatch({ type: `${path}.filters/INIT` });
        dispatch({ type: `${path}.pinInput/INIT`, payload: { latitude, longitude }});
        dispatch({ type: `${path}.sunrise/INIT`, payload: { latitude, longitude }});
      });
    }
  },
  reducer: {}
});
