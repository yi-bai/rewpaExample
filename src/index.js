import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {createStore, applyMiddleware, compose} from 'redux';
import promiseMiddleware from 'redux-promise';
import { connect, Provider } from 'react-redux';
import { rewpaMiddleware } from '../../rewpa/src/index';

import reducer from './reducers/Reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(App.rewpa, composeEnhancers(applyMiddleware(promiseMiddleware, rewpaMiddleware)));
const rootEl = document.getElementById('root')

const render = () => ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	rootEl
)

render()