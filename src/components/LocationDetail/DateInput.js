import React from 'react';
import { connect } from 'react-redux';
import { getPath } from '../../../../rewpa/src/index';

class Input extends React.Component {
    constructor(){
        super();
    }

    componentDidMount(){
        const { dispatch } = this.props;
    }

    render(){
        const { data, path, dispatch } = this.props;
    	return (
        <div>
            <input
                value={data.year}
                onChange={(e) => dispatch({ type: `${path}.year/_SET`, payload: parseFloat(e.target.value) })}
            />
            <input
                value={data.month}
                onChange={(e) => dispatch({ type: `${path}.month/_SET`, payload: parseFloat(e.target.value) })}
            />
            <input
                value={data.day}
                onChange={(e) => dispatch({ type: `${path}.day/_SET`, payload: parseFloat(e.target.value) })}
            />
        </div>
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
