import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { match, Router, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { getBasicReducers } from './utils'

export default function(routes, reducers = getBasicReducers()) {
	const { pathname, search, hash } = window.location
	const location = `${pathname}${search}${hash}`
	const initialState = window.__INITIAL_STATE__
	const store = createStore(reducers, initialState)

	match({ routes, location }, () => {
		render(
			<Provider store={store}>
				<Router routes={routes} history={browserHistory} />
			</Provider>,
			document.getElementById('app')
		)
	})
}
