import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import axios from 'axios';
import { createRewpa, getPath } from '../../../rewpa/src/index';
import { Router, Route, IndexRoute } from 'react-router';

// Component
import CounterDetail from './CounterDetail';
import LocationDetail from './LocationDetail';
import TodoList from './TodoList';

const App = (props) => {
	const { history } = props;
	return (
        <div>
            <Router history={history}>
                <Route path="/">
                    <IndexRoute component={TodoList}/>
                </Route>
            </Router>
        </div>
	);
}

// Reducer
export default App;
