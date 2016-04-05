import express from 'express'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import { createPage, getBasicStore } from './utils'

function renderSite(req, res, routes, store) {
	if (typeof store === 'undefined') {
		store = getBasicStore()
	}

	match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
		if (error) {
			res.status(500).send(error.message);
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search)
		} else if (renderProps) {
			res.status(200).send(createPage(renderToString(<Provider store={store}><RouterContext {...renderProps} /></Provider>)))
		} else {
			res.status(404).send('Not found')
		}
	});
}

var router = express.Router();

export default function(routes, store) {
	router.get('*', function(req, res, next) {

		if (typeof routes === 'function') {
			routes = routes.call(this, req, res);
		}

		renderSite(req, res, routes, store);
	});	
	return router;
}
