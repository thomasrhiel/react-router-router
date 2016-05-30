import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { match, Router, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { getBasicReducers } from './utils';

export default function (params) {
	const { routes, reducers = getBasicReducers() } = params;
	const { pathname, search, hash } = window.location;
	const location = `${ pathname }${ search }${ hash }`;
	const initialState = window.__INITIAL_STATE__;
	const store = createStore(reducers, initialState);

	match({ routes, location }, () => {
		render(React.createElement(
			Provider,
			{ store: store },
			React.createElement(Router, { routes: routes, history: browserHistory })
		), document.getElementById('app'));
	});
}