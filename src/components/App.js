import React from 'react';
import { connect } from 'react-redux';
import Actions from '../async/Actions';
import ListCounter from './ListCounter';
import Counter from './Counter';
import ConfirmBox from './ConfirmBox';
import _ from 'lodash';
import { createRewpa, joinPath, getPath } from '../../../rewpa/src/index';

// Component
class App extends React.Component {
    constructor(){
        super();
    }

    render(){
    	const { path } = this.props;
    	return (
    		<div>
	    		A counters:
	    		<ListCounter path={joinPath(path, 'countersA')} />
    			B counters:
	    		<ListCounter path={joinPath(path, 'countersB')} />
                sole counter:
                <Counter path={joinPath(path, 'counterC')} />
                <ConfirmBox path={joinPath(path, 'confirmBox')} />
    		</div>
    	);
    }
}

// Data
const mapStateToProps = (state, { path }) => {
	return getPath(state, path);
}

// Actions, Effects
const mapDispatchToProps = (dispatch, { path }) => {
	return { dispatch };
}

// Reducer
const container = connect(mapStateToProps, mapDispatchToProps)(App);
container.rewpa = createRewpa({
  schema: {
    countersA: ListCounter.rewpa,
    countersB: ListCounter.rewpa,
    counterC: Counter.rewpa,
    counterMap: { '*': Counter.rewpa }
  }
});
export default container;
