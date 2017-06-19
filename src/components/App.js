import React from 'react';
import { connect } from 'react-redux';
import Actions from '../async/Actions';
import ListCounter from './ListCounter';
import Counter from './Counter';
import ConfirmBox from './ConfirmBox';
import _ from 'lodash';
import axios from 'axios';
import { createRewpa, getPath } from '../../../rewpa/src/index';

// Component
class App extends React.Component {
    constructor(){
        super();
    }

    componentDidMount(){
    }

    render(){
    	const { path } = this.props;
    	return (
    		<div>
	    		TopMap
	    		<ListCounter path={'countersA'} />
    			B counters:
	    		<ListCounter path={'countersB'} />
                sole counter:
                <Counter path={'counterC'} />
                <ConfirmBox path={'confirmBox'} />
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
	return { dispatch, emit: (type, payload) => container.emit() };
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
