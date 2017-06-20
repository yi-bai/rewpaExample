import React from 'react';
import { connect } from 'react-redux';
import Actions from '../async/Actions';
import ListCounter from './ListCounter';
import Counter from './Counter';
import ConfirmBox from './ConfirmBox';
import _ from 'lodash';
import axios from 'axios';
import { createRewpa, getPath } from '../../../rewpa/src/index';
import { Link } from 'react-router';

// Component
class App extends React.Component {
    constructor(){
        super();
    }

    componentDidMount(){
    }

    render(){
    	const { history } = this.props;
    	return (
    		<div>
	    		TopMap
	    		<ListCounter path={'countersA'} />
    			B counters:
	    		<ListCounter path={'countersB'} />
                sole counter:
                <Counter path={'counterC'} />
                <ConfirmBox path={'confirmBox'} />
                <Link to={`/locations/31`}>LocationDetail31</Link>
    		</div>
        );
    }
}

// Data
const mapStateToProps = (state, { path }) => {
	return state;
}

// Actions, Effects
const mapDispatchToProps = (dispatch, { path }) => {
	return { dispatch };
}

// Reducer
export default connect(mapStateToProps, mapDispatchToProps)(App);
