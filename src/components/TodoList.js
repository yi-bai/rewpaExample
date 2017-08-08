import React from 'react';
import { connect } from 'react-redux';
import { getPath, dispatchPath } from '../../../rewpa/src/index';
import _ from 'lodash';

import Task from './TodoList/Task';
import InputTask from './TodoList/InputTask';

// Component
class Counter extends React.Component {
    constructor(){
        super();
    }

    render(){
      const { dispatch, taskList, input } = this.props;
      console.log(this.props);
      return (
            <div>
                todo list
                <InputTask path={path.input} />
                {taskList.map((task, i) =>
                    (input.filter === 'all' ||
                      (input.filter === 'active' && !task.isCompleted) ||
                      (input.filter === 'completed' && task.isCompleted)) ?
                        <div key={i}>
                            <span>
                                <button onClick={() => dispatch({ type: `${path.taskList}/_DELETE`, payload: i })}>
                                    Delete
                                </button>
                            </span>
                            <Task path={`${path.taskList}.${i}`} />
                        </div> : null
                )}
                {taskList.filter((task) => !task.isCompleted).length} items left

                {['all', 'active', 'completed'].map((f) =>
                    <button onClick={() => dispatch({ type: `${path.input}.filter/_SET`, payload: f })}>
                        { input.filter === f ? f.toUpperCase() : f }
                    </button>
                )}

                <button onClick={() => dispatch({ type: `${path.taskList}/CLEAR_COMPLETED` })}>
                    Clear Completed
                </button>
            </div>
        );
    }
}

const path = { taskList: 'tasks.list', input: 'input' };
const mapStateToProps = (state) => { return getPath(state, path); };
const mapDispatchToProps = (dispatch) => { return { dispatch }; };
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
