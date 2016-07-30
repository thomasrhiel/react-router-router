import { createStore } from 'redux'
import { routerReducer } from 'react-router-redux'

export function createPage(html, opts) {
	let params = {
		id: 'app',
		js_src: 'main.js',
		initial_state: {}, 
		css: null, 
		meta: null
	}

	Object.assign(params, opts || {})

	const css = params.css ? `<style type="text/css">${params.css}</style>` : ''
	const html_tag = params.meta.htmlAttributes.toString() !== '' ? `<html ${params.meta.htmlAttributes.toString()}>` : `<html>`

	return `
	<!doctype>
	${html_tag}
		<head>
			${params.meta.title.toString()}
			${params.meta.meta.toString()}
			${params.meta.base.toString()}
			${params.meta.link.toString()}
			${params.meta.style.toString()}
			${params.meta.script.toString()}
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

const initialDocumentMeta = {
	htmlAttributes: {},
	title: '',
	base: {},
	meta: [],
	link: [], 
	script: [],
	style: []
}

function documentMeta(state = initialDocumentMeta, action) {
	switch(action.type) {
		case 'UPDATE_DOCUMENT_META':
			return Object.assign({}, state, action.payload)
		default:
			return state
	}
}

export function getBasicReducers() {
	const basic_reducers = {
		routing: routerReducer,
		documentMeta: documentMeta
	}

	return basic_reducers
}
