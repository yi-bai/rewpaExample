import React from 'react';
import { connect } from 'react-redux';
import Actions from '../async/Actions';
import Counter from './Counter';
import _ from 'lodash';
import { createRewpa, getPath } from '../../../rewpa/src/index';

// Component
class ListCounter extends React.Component {
    constructor(){
        super();
    }

    render(){
        const { path, dispatch } = this.props;
        let counters = this.props.list.map((counter, index) => {
            return <div key={index}>
                <Counter
                    path={`${path}[${index}]`}
                    removeCounter={() => this.props.removeCounter(index)}
                />
            </div>;
        });
    	return (
            <div>
                { counters }
                <div onClick={() => dispatch({ path, type: '_INSERT' })}>
                    + Counter
                </div>
            </div>
        );
    }
}

// Data
const mapStateToProps = (state, { path }) => {
    return { list: getPath(state, path) };
}

// Actions, Effects
const mapDispatchToProps = (dispatch, ownProps) => {
    return { dispatch };
}

// Reducer
export default connect(mapStateToProps, mapDispatchToProps)(ListCounter);
