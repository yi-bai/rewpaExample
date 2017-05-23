import React from 'react';
import { connect } from 'react-redux';
import Actions from '../async/Actions';
import ListCounter from './ListCounter';
import _ from 'lodash';

class App extends React.Component {
    constructor(){
        super();
    }

    render(){
    	console.log(this.props);
    	return (
    		<div>
	    		A counters:
	    		<ListCounter
	    			counters={this.props.countersA}
	    			increment={(index) => this.props.increment('countersA', index)}
	    			decrement={(index) => this.props.decrement('countersA', index)}
	    			removeCounter={(index) => this.props.removeCounter('countersA', index)}
	    		/>
	    		<div onClick={() => this.props.addCounter('countersA')}>
	    			+ Counter
	    		</div>
	    		B counters:
	    		<ListCounter
	    			counters={this.props.countersB}
	    			increment={(index) => this.props.increment('countersB', index)}
	    			decrement={(index) => this.props.decrement('countersB', index)}
	    			removeCounter={(index) => this.props.removeCounter('countersB', index)}
	    		/>
	    		<div onClick={() => this.props.addCounter('countersB')}>
	    			+ Counter
	    		</div>
    		</div>
    	);
    }
}

const mapStateToProps = (state) => {
	return _.assign({}, state);
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		increment: (counterName, index) => 
			dispatch({
				type: `${counterName}[${index}]/increment`
			}),
		decrement: (counterName, index) =>
			dispatch({
				type: `${counterName}[${index}]/decrement`
			}),
		addCounter: (counterName) =>
			dispatch({
				type: `${counterName}/__append`,
				payload: { count: 0 }
			}),
		removeCounter: (counterName, index) =>
			dispatch({
				type: `${counterName}/__remove`,
				payload: index
			})
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
