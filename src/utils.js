import { createStore, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

export function createPage(html, opts) {
	let params = {
		id: 'app',
		js_src: 'main.js',
		initial_state: {}, 
		css: null
	}

	Object.assign(params, opts || {})

	const css = params.css ? `<style type="text/css">${params.css}</style>` : ''

	return `
	<!doctype html>
	<html>
		<head>
			<title></title>
			<meta charset="utf-8"/>			
			<meta name="viewport" content="width=device-width, user-scalable=no, maximum-scale=1, initial-scale=1"/>
			${css}		
		</head>
		<body>
			<div id="${params.id}">${html}</div>
			<script>
				window.__INITIAL_STATE__ = ${JSON.stringify(params.initial_state)}
			</script>			
			<script src="${params.js_src}"></script>
		</body>
	</html>
	`
}

export function getBasicReducers() {
	const basic_reducers = {
		routing: routerReducer
	}

	return combineReducers(basic_reducers)
}
