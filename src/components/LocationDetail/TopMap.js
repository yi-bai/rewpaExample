import React from 'react';
import { connect } from 'react-redux';
import { getPath } from '../../../../rewpa/src/index';

import NumberInput from './NumberInput';

class LocationDetail extends React.Component {
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
        {data.location.latitude}, {data.location.longitude}
        <a onClick={() => dispatch({ type: `${path.pinInput}.isInputting/_SET`, payload: true })}>Input</a>
        {data.pinInput.isInputting ?
        <div>
            <NumberInput path={`${path.pinInput}.latitude`}/>
            <NumberInput path={`${path.pinInput}.longitude`}/>
            {data.pinInput.isLoading ? 'loading...' :
              <a onClick={() => dispatch({ type: `${path.pinInput}/CREATE_PIN` })}>Create Pin</a>}
        </div>
        : null}
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
export default connect(mapStateToProps, mapDispatchToProps)(LocationDetail);
