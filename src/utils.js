import { createStore } from 'redux'
import { routerReducer } from 'react-router-redux'



const encodeSpecialCharacters = (str) => {
    return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#x27;");
};

const generateTitleAsString = (title) => {
    const stringifiedMarkup = `<title>${encodeSpecialCharacters(title)}</title>`;

    return stringifiedMarkup;
};

const generateHtmlAttributesAsString = (attributes) => {
    const keys = Object.keys(attributes);
    let attributeString = "";

    for (let i = 0; i < keys.length; i++) {
        const attribute = keys[i];
        const attr = typeof attributes[attribute] !== "undefined" ? `${attribute}="${attributes[attribute]}"` : `${attribute}`;
        attributeString += `${attr} `;
    }

    return attributeString.trim();
};

const generateTagsAsString = (type, tags) => {
    const stringifiedMarkup = tags.map(tag => {
        const attributeHtml = Object.keys(tag)
            .filter(attribute => !(attribute === "innerHTML" || attribute === "cssText"))
            .map(attribute => {
                if (typeof tag[attribute] === "undefined") {
                    return attribute;
                }

                const encodedValue = encodeSpecialCharacters(tag[attribute]);
                return `${attribute}="${encodedValue}"`;
            })
            .join(" ").trim();

        const tagContent = tag.innerHTML || tag.cssText || "";

        return `<${type} ${attributeHtml}${type === 'script' || type === 'style' ? `>${tagContent}</${type}>` : `/>`}`;
    }).join("");

    return stringifiedMarkup;
}


export function createPage(html, opts) {
	let params = {
		id: 'app',
		js_src: '/main.js',
		initial_state: {}, 
		css: null
	}

	Object.assign(params, opts || {})

	const css = params.css ? `<style type="text/css">${params.css}</style>` : ''
	const html_attributes = generateHtmlAttributesAsString(params.initial_state.documentMeta.htmlAttributes)
	const html_tag = html_attributes !== '' ? `<html ${html_attributes}>` : `<html>`

	return `
	<!doctype>
	${html_tag}
		<head>
			${generateTitleAsString(params.initial_state.documentMeta.title)}
			${generateTagsAsString('meta', params.initial_state.documentMeta.meta)}
			${generateTagsAsString('base', [params.initial_state.documentMeta.base])}
			${generateTagsAsString('link', params.initial_state.documentMeta.link)}
			${generateTagsAsString('style', params.initial_state.documentMeta.style)}
			${generateTagsAsString('script', params.initial_state.documentMeta.script)}
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
