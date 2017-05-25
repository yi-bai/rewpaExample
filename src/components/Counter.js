import React from 'react';
import { connect } from 'react-redux';
import Actions from '../async/Actions';
import { joinPath, connectWithPath } from '../../../rewpa/src/index';

class Counter extends React.Component {
    constructor(){
        super();
    }

    render(){
        console.log(this.props.path);
    	return (
            <div>
                <span onClick={() => this.props.decrement()}>-</span>
                { this.props.count }
                <span onClick={() => this.props.increment()}>+</span>
                <span onClick={() => this.props.clear()}>Clear</span>
                <span onClick={() => this.props.removeCounter()}>Remove</span>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {};
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        increment: () =>
            dispatch({
                type: `increment`
            }),
        decrement: () =>
            dispatch({
                type: `decrement`
            }),
        clear: () =>
            dispatch({
                type: '__assign',
                payload: { count: 0 }
            })
    };
}

export default connectWithPath(connect)(mapStateToProps, mapDispatchToProps)(Counter);
