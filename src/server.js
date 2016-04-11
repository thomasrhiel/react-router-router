import express from 'express'
import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import { createPage, getBasicReducers } from './utils'

function renderSiteToString(store, renderProps) {
	return renderToString(
		<Provider store={store}>
			<RouterContext {...renderProps} />
		</Provider>
	)
}

function _doRenderSite(req, res, store, renderProps, prerender, postrender) {
	prerender.call(this, req, store, (req, store) => {
		let html_string = renderSiteToString(store, renderProps)

		// there's an opportunity here to pass more arguments to the html renderer (e.g., react-document-title)
		postrender.call(this, req, store, html_string, (req, store, html_string) => {
			const initial_state = store.getState()
			res.status(200).send(createPage(html_string, { initial_state }))	
		})
	})	
}

function renderSite(req, res, params) {
	let { routes, store, prerender, postrender } = params

	match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
		if (error) {
			res.status(500).send(error.message)
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search)
		} else if (renderProps) {
			_doRenderSite(req, res, store, renderProps, prerender, postrender)
		} else {
			res.status(404).send('Not found')
		}
	})
}

function defaultPrerender(req, store, cb) {
	cb.call(this, req, store)
}

function defaultPostrender(req, store, html_string, cb) {
	cb.call(this, req, store, html_string)
}

const router = express.Router()

export default function(params) {
	const defaults = {
		routes: null,
		reducers: getBasicReducers(),
		prerender: defaultPrerender,
		postrender: defaultPostrender
	}

	params = Object.assign(defaults, params)
	params.store = createStore(params.reducers)

	router.get('*', function(req, res, next) {
		renderSite(req, res, params)
	})

	return router
}
