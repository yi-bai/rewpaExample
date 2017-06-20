import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import axios from 'axios';
import { createRewpa, getPath } from '../../../rewpa/src/index';
import { Router, Route, IndexRoute } from 'react-router';

// Component
import CounterDetail from './CounterDetail';
import LocationDetail from './LocationDetail';

const App = (props) => {
	const { history } = props;
	return (
        <div>
            <Router history={history}>
                <Route path="/">
                    <IndexRoute component={LocationDetail}/>
                </Route>
            </Router>
        </div>
	);
}

// Reducer
export default App;
