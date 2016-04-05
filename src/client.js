import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { match, Router, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { getBasicStore } from './utils'

export default function(routes, store) {
	const { pathname, search, hash } = window.location
	const location = `${pathname}${search}${hash}`

	if (typeof store === 'undefined') {
		store = getBasicStore()
	}	

	match({ routes, location }, () => {
		render(
			<Provider store={store}>
				<Router routes={routes} history={browserHistory} />
			</Provider>,
			document.getElementById('app')
		)
	})
}
