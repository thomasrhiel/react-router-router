import { createStore, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

export function createPage(html, opts) {
	let params = {
		id: 'app',
		js_src: 'main.js'
	}

	Object.assign(params, opts || {})

	return `
	<!doctype html>
	<html>
		<head>
			<title>sitemaker.xyz</title>
			<meta charset="utf-8"/>			
			<meta name="viewport" content="width=device-width, user-scalable=no, maximum-scale=1, initial-scale=1"/>
		</head>
		<body>
			<div id="${params.id}">${html}</div>
			<script src="${params.js_src}"></script>
		</body>
	</html>
	`
}

export function getBasicStore() {
	let basic_reducers = {
		routing: routerReducer
	}

	return createStore(combineReducers(basic_reducers))
}