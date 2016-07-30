'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.createPage = createPage;
exports.getBasicReducers = getBasicReducers;

var _redux = require('redux');

var _reactRouterRedux = require('react-router-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createPage(html, opts) {
	var params = {
		id: 'app',
		js_src: 'main.js',
		initial_state: {},
		css: null,
		meta: null
	};

	(0, _assign2.default)(params, opts || {});

	var css = params.css ? '<style type="text/css">' + params.css + '</style>' : '';
	var html_tag = params.meta.htmlAttributes.toString() !== '' ? '<html ' + params.meta.htmlAttributes.toString() + '>' : '<html>';

	return '\n\t<!doctype>\n\t' + html_tag + '\n\t\t<head>\n\t\t\t' + params.meta.title.toString() + '\n\t\t\t' + params.meta.meta.toString() + '\n\t\t\t<meta charset="utf-8"/>\t\t\t\n\t\t\t<meta name="viewport" content="width=device-width, user-scalable=no, maximum-scale=1, initial-scale=1"/>\n\t\t\t' + css + '\t\t\n\t\t</head>\n\t\t<body>\n\t\t\t<div id="' + params.id + '">' + html + '</div>\n\t\t\t<script>\n\t\t\t\twindow.__INITIAL_STATE__ = ' + (0, _stringify2.default)(params.initial_state) + '\n\t\t\t</script>\t\t\t\n\t\t\t<script src="' + params.js_src + '"></script>\n\t\t</body>\n\t</html>\n\t';
}

var initialDocumentMeta = {
	htmlAttributes: {},
	title: '',
	base: {},
	meta: [],
	link: [],
	script: [],
	style: []
};

function documentMeta() {
	var state = arguments.length <= 0 || arguments[0] === undefined ? initialDocumentMeta : arguments[0];
	var action = arguments[1];

	switch (action.type) {
		case 'UPDATE_DOCUMENT_META':
			return (0, _assign2.default)({}, state, action.payload);
		default:
			return state;
	}
}

function getBasicReducers() {
	var basic_reducers = {
		routing: _reactRouterRedux.routerReducer,
		documentMeta: documentMeta
	};

	return basic_reducers;
}