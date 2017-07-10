import React from 'react';
import { connect } from 'react-redux';
import { getPath } from '../../../../rewpa/src/index';

class Input extends React.Component {
    constructor(){
        super();
    }

    render(){
        const { data, path, dispatch } = this.props;
    	return (
            <input
                value={data}
                onChange={(e) => dispatch({ type: `${path}/SET`, payload: parseFloat(e.target.value) })}
            />
        );
    }
}

// Data
const mapStateToProps = (state, { path }) => {
	return { data: getPath(state, path) };
}

// Actions, Effects
const mapDispatchToProps = (dispatch, { path }) => {
	return { dispatch };
}

// Reducer
export default connect(mapStateToProps, mapDispatchToProps)(Input);
