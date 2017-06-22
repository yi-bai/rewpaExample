import { createRewpa, getPath } from '../../../rewpa/src/index';
import Rx from 'rxjs';
import axios from 'axios';
import asStream from './utils/asStream';
import DateRewpa from './Date';

import SunCalc from 'suncalc';

const getSunrise = (latitude, longitude, date) => {
  const chosenDate = new Date(`${date.year}-${date.month}-${date.day}`);
  console.log(chosenDate);
  const { sunrise, sunset } = SunCalc.getTimes(chosenDate, latitude, longitude);
  const moonInfo = SunCalc.getMoonTimes(chosenDate, latitude, longitude);
  return { sunrise, sunset, moonrise: moonInfo.rise, moonset: moonInfo.set };
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
      sunset: '--:--',
      moonrise: '--:--',
      moonset: '--:--'
    }
  },
  effects: {
    _ON_CHANGE: ({ path, payload: { prevState } }, dispatch, getState) => {
      const nextState = getPath(getState(), path); prevState = getPath(prevState, path);
      if(nextState.date !== prevState.date){
        const { latitude, longitude, date } = nextState;
        dispatch({ type: `${path}.times/_ASSIGN`, payload: getSunrise(latitude, longitude, date)});
      }
    }
  },
  reducer: {
    INIT: (state, { payload: { latitude, longitude } }, put) => {
      return put(
        { type: 'times/_ASSIGN', payload: getSunrise(latitude, longitude, state.date) },
        { type: '/_ASSIGN', payload: {latitude, longitude} });
    }
  }
});
