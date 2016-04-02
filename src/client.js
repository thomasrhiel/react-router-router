import React from 'react'
import { match, Router, browserHistory } from 'react-router'
import { render } from 'react-dom'

export default function(routes) {
	const { pathname, search, hash } = window.location
	const location = `${pathname}${search}${hash}`

	match({ routes, location }, () => {
		render(
			<Router routes={routes} history={browserHistory} />,
			document.getElementById('app')
		)
	})
}
