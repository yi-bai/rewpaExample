import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {createStore, applyMiddleware, compose} from 'redux';
import promiseMiddleware from 'redux-promise';

import reducer from './reducers/Reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(promiseMiddleware)));
const rootEl = document.getElementById('root')

const render = () => ReactDOM.render(
	<App/>,
	rootEl
)

render()