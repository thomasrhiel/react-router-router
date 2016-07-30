import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { match, Router, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { getBasicReducers } from './utils'

import AppContext from './app-context'

export default function(params) {
	const { routes, reducers = getBasicReducers() } = params
	const { pathname, search, hash } = window.location
	const location = `${pathname}${search}${hash}`
	const initialState = window.__INITIAL_STATE__
	const store = createStore(reducers, initialState)


	const context = (styles) => styles._insertCss()

	match({ routes, location }, () => {
		render(
			<AppContext insertCss={context}>
				<Provider store={store}>
					<Router routes={routes} history={browserHistory} />
				</Provider>
			</AppContext>,
			document.getElementById('app')
		)
	})
}
