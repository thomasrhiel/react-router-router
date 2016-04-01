import React from 'react';
import { match, Router, browserHistory } from 'react-router';
import { render } from 'react-dom';

// calling `match` is simply for side effects of
// loading route/component code for the initial location

export default function SitemakerClient(routes) {
	const { pathname, search, hash } = window.location;
	const location = `${ pathname }${ search }${ hash }`;

	match({ routes, location }, () => {
		render(React.createElement(Router, { routes: routes, history: browserHistory }), document.getElementById('app'));
	});
}