import { createRewpa, getPath } from '../../../rewpa/src/index';
import Rx from 'rxjs';
import axios from 'axios';
import asStream from './utils/asStream';

export default createRewpa({
  name: 'AccessoryInput',
  schema: {
    id: null,
    accessory: ''
  },
  effects: {},
  reducer: {}
});
