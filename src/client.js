import React from 'react'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { match, Router, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { getBasicReducers } from './utils'

import AppContext from './app-context'

export default function(params) {
	const { routes, reducers = {} } = params
	const { pathname, search, hash } = window.location
	const location = `${pathname}${search}${hash}`
	const initialState = window.__INITIAL_STATE__

	Object.assign(reducers, getBasicReducers())
	const store = createStore(combineReducers(reducers), initialState)
	const context = (styles) => styles._insertCss()

	match({ routes, location }, () => {
		render(
				<Provider store={store}>
					<AppContext insertCss={context}>
							<Router routes={routes} history={browserHistory} />
					</AppContext>
				</Provider>,
			document.getElementById('app')
		)
	})
}
