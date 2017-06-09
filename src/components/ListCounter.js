import React from 'react';
import { connect } from 'react-redux';
import Actions from '../async/Actions';
import Counter from './Counter';
import _ from 'lodash';
import { createRewpa, joinPath, getPath } from '../../../rewpa/src/index';

// Component
class ListCounter extends React.Component {
    constructor(){
        super();
    }

    render(){
        const { path, dispatch } = this.props;
        let counters = this.props.list.map((counter, index) => {
            return <div>
                <Counter
                    path={joinPath(this.props.path, index)}
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
const container = connect(mapStateToProps, mapDispatchToProps)(ListCounter);
container.rewpa = createRewpa({
  schema: [Counter.rewpa]
});
export default container;
