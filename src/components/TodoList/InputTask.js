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
            <div>
                <input
                  value={data.inputValue}
                  onChange={(e) => dispatch({ type: `${path}.inputValue/_SET`, payload: e.target.value })}
                />
                <button onClick={() => dispatch({ type: `${path}/SUBMIT` })}>
                  Submit
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state, { path }) => { return getPath(state, path); };
const mapDispatchToProps = (dispatch) => { return { dispatch }; };
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
