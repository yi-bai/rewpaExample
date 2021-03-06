import React from 'react';
import { connect } from 'react-redux';
import { createRewpa, getPath } from '../../../../rewpa/src/index';

import NumberInput from './NumberInput';
import DateInput from './DateInput';

class LocationInfoAndSunrise extends React.Component {
  constructor(){
    super();
  }

  render(){
    const { data, path, dispatch } = this.props;
    const { ui, location, pinInput, sunrise } = data;
    return (
      <div>
        <a onClick={() => dispatch({ type:`${path.ui}.tab/_SET`, payload: 1 })}>LocationInfo</a> |
        <a onClick={() => dispatch({ type:`${path.ui}.tab/_SET`, payload: 2 })}>Sunrise</a>
        {ui.tab === 1 ?
          <div>
            {location.name}, {location.addressJp}, {location.countryJp},
            {location.latitude}, {location.longitude}
            <br/>
            <a onClick={() => dispatch({ type:`${path.pinInput}/TOGGLE_INPUT` })}>
              ピンを立てるを{pinInput.isInputting ? '閉じる' : '開ける'}
            </a>
          </div>
        : null
        }
        {ui.tab === 2 ?
          <div>
            <DateInput path={`${path.sunrise}.date`}/>
            {JSON.stringify(sunrise.times)}
          </div>
        : null
        }
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
const container = connect(mapStateToProps, mapDispatchToProps)(LocationInfoAndSunrise);
container.rewpa = createRewpa({
  schema:{
    tab: 1
  }
});
export default container;
