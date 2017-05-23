import React from 'react';
import { connect } from 'react-redux';
import Actions from '../async/Actions';

class Counter extends React.Component {
    constructor(){
        super();
    }

    render(){
    	return (
            <div>
                <span onClick={() => this.props.decrement()}>-</span>
                { this.props.count }
                <span onClick={() => this.props.increment()}>+</span>
            </div>
        );
    }
}

export default Counter;
