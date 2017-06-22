import React from 'react';
import { connect } from 'react-redux';
import { createRewpa, getPath } from '../../../../rewpa/src/index';

import NumberInput from './NumberInput';
import DateInput from './DateInput';

class EvaluationAccessoryDisplay extends React.Component {
  constructor(){
    super();
  }

  render(){
    const { data, path, dispatch } = this.props;
    const { location, evaluationInput } = data;
    return (
      <div>
        <div>
          { location.countEvaluations }人評価
          { location.evaluation.point1 }, { location.evaluation.point2 }, { location.evaluation.point3 }
        </div>
        <div>
          { location.accessories.map((accessory) => accessory.accessory).join(', ') }
        </div>
        <a onClick={() => dispatch({ type: `${path.evaluationInput}/TOGGLE_INPUT` })}>
          評価入力を{evaluationInput.isInputting ? '閉じる' : '開ける'}
        </a>
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
const container = connect(mapStateToProps, mapDispatchToProps)(EvaluationAccessoryDisplay);
export default container;
