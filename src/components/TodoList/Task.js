import React from 'react';
import { connect } from 'react-redux';
import { getPath, dispatchPath } from '../../../../rewpa/src/index';
import _ from 'lodash';

// Component
class Counter extends React.Component {
    constructor(){
        super();
    }

    render(){
      const { dispatch, path, data } = this.props;
      console.log(this.props);
      return (
            <span>
                <button onClick={() => dispatch({ type: `${path}.isCompleted/_SET`, payload: !data.isCompleted })}>
                    {data.isCompleted ? 'Completed' : 'Not Completed'}
                </button>
                { data.name }
            </span>
        );
    }
}

const mapStateToProps = (state, { path }) => { return getPath(state, path); };
const mapDispatchToProps = (dispatch) => { return { dispatch }; };
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
