import { createRewpa } from '../../../rewpa/src/index';
import { routerReducer } from 'react-router-redux';
import counterRewpa from './Counter';

export default createRewpa({
  schema: {
    countersA: [counterRewpa],
    countersB: [counterRewpa],
    counterC: counterRewpa,
    counterMap: { '*': counterRewpa },
    location: LocationRewpa,
    routing: routerReducer
  }
});
