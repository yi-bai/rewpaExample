import React from 'react';
import { connect } from 'react-redux';
import { createRewpa, getPath } from '../../../../rewpa/src/index';

import EvaluationNumberInput from './EvaluationNumberInput';
import DateInput from './DateInput';

class EvaluationAccessoryInput extends React.Component {
  constructor(){
    super();
  }

  render(){
    const { data, path, dispatch } = this.props;
    const { evaluationInput, accessoryInput, ui } = data;
    if(!evaluationInput.isInputting) return null;
    return evaluationInput.inputStage === 0 ?
      <div>
        <div>
          <div>
            <EvaluationNumberInput path={`${path.evaluationInput}.point1`}/>
            <EvaluationNumberInput path={`${path.evaluationInput}.point2`}/>
            <EvaluationNumberInput path={`${path.evaluationInput}.point3`}/>
          </div>
          <input
            value={ui.accessoryInputText}
            onChange={(e) => dispatch({
              type: `${path.ui}.accessoryInputText/_SET`,
              payload: e.target.value
            })}
          />
          <a onClick={() => {
            dispatch({
              type: `${path.accessoryInput}/INSERT`,
              payload: { accessory: ui.accessoryInputText
            }});
            dispatch({
              type: `${path.ui}.accessoryInputText/_SET`,
              payload: ''
            });
          }}>
            OK
          </a>
          <div>
            {accessoryInput.map(e => (
              <span>
                {e.accessory}
                <a onClick={() => dispatch({
                  type: `${path.accessoryInput}/_DELETE`,
                  payload: { id: e.id }
                })}>
                  x
                </a>
              </span>
            ))}
          </div>
        </div>
        <a onClick={() => dispatch({
          type: `${path.evaluationInput}/SUBMIT`,
          payload: { pathAccessoryInput: path.accessoryInput
        }})}>
          投稿
        </a>
      </div> :
      <div>ありがとうございます</div>;
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
const container = connect(mapStateToProps, mapDispatchToProps)(EvaluationAccessoryInput);
container.rewpa = createRewpa({
  schema:{
    accessoryInputText: ''
  }
});
export default container;
