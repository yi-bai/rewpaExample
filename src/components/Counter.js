import React from 'react';
import { connect } from 'react-redux';
import Actions from '../async/Actions';
import { getPath, createRewpa } from '../../../rewpa/src/index';
import axios from 'axios';
import _ from 'lodash';

// Component
class Counter extends React.Component {
    constructor(){
        super();
    }

    render(){
      const { dispatch, path } = this.props;
      return (
            <div>
                <span onClick={() => dispatch({ path, type: 'DECREMENT' })}>-</span>
                { this.props.count }
                { this.props.isLoading ? 'loading...' : '' }
                <span onClick={() => dispatch({ path, type: 'INCREMENT' })}>+</span>
                <span onClick={() => dispatch({ path, type: 'STREAM' })}> +ASYNC</span>
                <span onClick={() => dispatch({ path, type: 'count/_SET', payload: 0 })}>Clear</span>
                <span onClick={() => this.props.removeCounter()}>Remove</span>
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
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
