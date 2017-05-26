import React from 'react';
import { connect } from 'react-redux';
import Actions from '../async/Actions';
import { joinPath, connectWithPath } from '../../../rewpa/src/index';

class ConfirmBox extends React.Component {
    constructor(){
        super();
    }

    render(){
        console.log(this.props.path);
    	return  this.props.isOpen ?
            <div>
                <span onClick={() => this.props.accept(this.props.acceptAction)}>Accept</span>
                <span onClick={() => this.props.close()}>Close</span>
            </div> : null;
    }
}

const mapStateToProps = (state, ownProps) => {
    return {};
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        accept: (acceptAction) => {
            dispatch(acceptAction);
            dispatch({ type: `close` });
        },
        close: () => dispatch({ type: `close` })
    };
}

export default connectWithPath(connect)(mapStateToProps, mapDispatchToProps)(ConfirmBox);
