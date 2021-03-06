import { createRewpa } from '../../../rewpa/src/index';
import { routerReducer } from 'react-router-redux';
import LocationRewpa from './Location';
import PinInputRewpa from './PinInput';
import SunriseRewpa from './Sunrise';
import EvaluationInputRewpa from './EvaluationInput';
import AccessoryInputRewpa from './AccessoryInput';

import LocationDetail from '../components/LocationDetail';

import { combineReducers } from 'redux';
/*
export default combineReducers({
  location: LocationRewpa,
  pinInput: PinInputRewpa,
  evaluationInput: EvaluationInputRewpa,
  accessoryInput: AccessoryInputRewpa,
  sunrise: SunriseRewpa,
  routing: routerReducer,
  ui: LocationDetail.rewpa,
  isLoading: false
});
*/
export default createRewpa({
  schema: {
    location: LocationRewpa,
    pinInput: PinInputRewpa,
    evaluationInput: EvaluationInputRewpa,
    accessoryInput: AccessoryInputRewpa,
    sunrise: SunriseRewpa,
    routing: routerReducer,
    ui: LocationDetail.rewpa,
    isLoading: false
  },
  effects: {
    INIT: ({ path }, dispatch, getState) => {
      dispatch({ type: `${path}.isLoading/_SET`, payload: true });
      dispatch({ type: 'location/INIT' });
      dispatch({ type: 'location/INIT' });
      dispatch({ type: 'location/ANOTHER' });
      dispatch({ type: 'location/INIT' });
      /*
      return dispatch({ path, type: 'location/INIT' })
      .then((response) => {
        const { latitude, longitude, userEvaluation } = response;
        dispatch({ type: `${path}.isLoading/_SET`, payload: false });
        dispatch({ type: `${path}.reviews/INIT` });
        dispatch({ type: `${path}.followers/INIT` });
        dispatch({ type: `${path}.weatherReport/INIT` });
        dispatch({ type: `${path}.photos/INIT` });
        dispatch({ type: `${path}.filters/INIT` });
        dispatch({ type: `${path}.pinInput/INIT`, payload: { latitude, longitude }});
        dispatch({ type: `${path}.sunrise/INIT`, payload: { latitude, longitude }});

        dispatch({ type: `${path}.evaluationInput/UPDATE`, payload: response.userEvaluation });
        dispatch({ type: `${path}.accessoryInput/_SET`, payload: response.accessories });
      });*/
    },
    _AFTER_ACTION: ({ payload }, dispatch, getState) => {
      console.log(payload.action, 'index after action called');
    }
  },
  reducer: {}
});
