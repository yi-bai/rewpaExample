import Rx from 'rxjs';

export default (epic, options) => {
  const streamMaps = {};
  options = options || { autoSubscribe: true };
  return (action, dispatch, getState) => {
    if(!(action.path in streamMaps)){
      console.log('inside creating asStream');
      streamMaps[action.path] = {};
      streamMaps[action.path].input = new Rx.Subject();
      streamMaps[action.path].output = epic(streamMaps[action.path].input, dispatch, getState);
      if(options.autoSubscribe) streamMaps[action.path].output.subscribe(dispatch);
    }
    streamMaps[action.path].input.next(action);
    return streamMaps[action.path].output;
  };
}