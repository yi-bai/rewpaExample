import React from 'react';
import { connect } from 'react-redux';
import Actions from '../async/Actions';
import Counter from './Counter';
import _ from 'lodash';
import { joinPath, connectWithPath } from '../../../rewpa/src/index';

class ListCounter extends React.Component {
    constructor(){
        super();
    }

    render(){
        console.log(this.props.path);
        let counters = this.props.__list.map((counter, index) => {
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
                <div onClick={() => this.props.addCounter()}>
                    + Counter
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {};
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addCounter: () =>
            dispatch({
                type: `_INSERT`
            }),
        removeCounter: (index) =>
            dispatch({
                type: `$..#ConfirmBox/open`,
                payload: {
                    acceptAction: {
                        type: `$.${ownProps.path}/_DELETE`,
                        payload: index
                    }
                }
            })
    };
}

export default connectWithPath(connect)(mapStateToProps, mapDispatchToProps)(ListCounter);
