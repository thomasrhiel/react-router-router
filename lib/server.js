import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { createPage } from './utils';

function renderSite(req, res, routes) {
	match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
		if (error) {
			res.status(500).send(error.message);
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search);
		} else if (renderProps) {
			// You can also check renderProps.components or renderProps.routes for
			// your "not found" component or route respectively, and send a 404 as
			// below, if you're using a catch-all route.

			res.status(200).send(createPage(renderToString(React.createElement(RouterContext, renderProps))));
		} else {
			res.status(404).send('Not found');
		}
	});
}

var router = express.Router();

function SitemakerRouter(routes) {
	router.get('*', function (req, res, next) {

		if (typeof routes === 'function') {
			routes = routes.call(this, req, res);
		}

		renderSite(req, res, routes);
	});
	return router;
}

export default SitemakerRouter;