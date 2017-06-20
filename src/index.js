import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {createStore, applyMiddleware, compose} from 'redux';
import { connect, Provider } from 'react-redux';
import { rewpaMiddleware } from '../../rewpa/src/index';

import reducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(rewpaMiddleware(reducer))));
const rootEl = document.getElementById('root')

import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
const history = syncHistoryWithStore(browserHistory, store);

const render = () => ReactDOM.render(
	<Provider store={store}>
		<App history={history}/>
	</Provider>,
	rootEl
)

render()