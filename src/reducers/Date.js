import { createRewpa, getPath } from '../../../rewpa/src/index';
import Rx from 'rxjs';
import axios from 'axios';
import asStream from './utils/asStream';
import DateRewpa from './Date';

const today = new Date();

export default createRewpa({
  name: 'Date',
  schema: {
    year: today.getFullYear(),
    month: today.getMonth()+1,
    day: today.getDate()
  },
  effects: {},
  reducer: {}
});
