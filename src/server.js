import express from 'express'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import Helmet from 'react-helmet'

import { createPage, getBasicReducers } from './utils'
import AppContext from './app-context'

function renderSiteToString(store, renderProps, context) {
	return renderToString(
		<Provider store={store}>
			<AppContext insertCss={context} >
				<RouterContext {...renderProps} />
			</AppContext>
		</Provider>
	)
}

function _doRenderSite(req, res, store, renderProps, beforeRenderToString, afterRenderToString) {
	beforeRenderToString.call(this, req, store, (req, store, context = {}) => {
		let html_string = renderSiteToString(store, renderProps, context)
		let head = Helmet.rewind()

		// there's an opportunity here to pass more arguments to the html renderer (e.g., react-document-title)
		afterRenderToString.call(this, req, store, html_string, (req, store, html_string, css) => {
			const initial_state = store.getState()
			res.status(200).send(createPage(html_string, { initial_state, css, meta: head }))	
		})
	})	
}

function renderSite(req, res, params) {
	let { routes, store, beforeRenderToString, afterRenderToString } = params

	match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
		if (error) {
			res.status(500).send(error.message)
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search)
		} else if (renderProps) {
			_doRenderSite(req, res, store, renderProps, beforeRenderToString, afterRenderToString)
		} else {
			res.status(404).send('Not found')
		}
	})
}

function defaultBeforeRenderToString(req, store, cb) {
	cb.call(this, req, store)
}

function defaultAfterRenderToString(req, store, html_string, cb) {
	cb.call(this, req, store, html_string)
}

const router = express.Router()

export default function(params) {
	const defaults = {
		routes: null,
		reducers: {},
		beforeRenderToString: defaultBeforeRenderToString,
		afterRenderToString: defaultAfterRenderToString
	}

	params = Object.assign(defaults, params)
	params.reducers = Object.assign(getBasicReducers())
	params.store = createStore(combineReducers(params.reducers))

	router.get('*', function(req, res, next) {
		renderSite(req, res, params)
	})

	return router
}
