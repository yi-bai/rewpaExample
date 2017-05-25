import React from 'react';
import { connect } from 'react-redux';
import Actions from '../async/Actions';
import ListCounter from './ListCounter';
import _ from 'lodash';
import { joinPath, connectWithPath } from '../../../rewpa/src/index';

class App extends React.Component {
    constructor(){
        super();
    }

    render(){
    	return (
    		<div>
	    		A counters:
	    		<ListCounter
	    			path={joinPath(this.props.path, 'countersA')}
	    		/>
    			B counters:
	    		<ListCounter
	    			path={joinPath(this.props.path, 'countersB')}
	    		/>
    		</div>
    	);
    }
}

const mapStateToProps = (state) => {
	return state;
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {};
}

export default connectWithPath(connect)(mapStateToProps, mapDispatchToProps)(App);
