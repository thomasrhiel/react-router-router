'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.createPage = createPage;
exports.getBasicReducers = getBasicReducers;

var _redux = require('redux');

var _reactRouterRedux = require('react-router-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var encodeSpecialCharacters = function encodeSpecialCharacters(str) {
	return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};

var generateTitleAsString = function generateTitleAsString(title) {
	var stringifiedMarkup = '<title>' + encodeSpecialCharacters(title) + '</title>';

	return stringifiedMarkup;
};

var generateHtmlAttributesAsString = function generateHtmlAttributesAsString(attributes) {
	var keys = (0, _keys2.default)(attributes);
	var attributeString = "";

	for (var i = 0; i < keys.length; i++) {
		var attribute = keys[i];
		var attr = typeof attributes[attribute] !== "undefined" ? attribute + '="' + attributes[attribute] + '"' : '' + attribute;
		attributeString += attr + ' ';
	}

	return attributeString.trim();
};

var generateTagsAsString = function generateTagsAsString(type, tags) {
	var stringifiedMarkup = tags.map(function (tag) {
		var attributeHtml = (0, _keys2.default)(tag).filter(function (attribute) {
			return !(attribute === "innerHTML" || attribute === "cssText");
		}).map(function (attribute) {
			if (typeof tag[attribute] === "undefined") {
				return attribute;
			}

			var encodedValue = encodeSpecialCharacters(tag[attribute]);
			return attribute + '="' + encodedValue + '"';
		}).join(" ").trim();

		var tagContent = tag.innerHTML || tag.cssText || "";

		return '<' + type + ' ' + attributeHtml + (type === 'script' || type === 'style' ? '>' + tagContent + '</' + type + '>' : '/>');
	}).join("");

	return stringifiedMarkup;
};

function createPage(html, opts) {
	var params = {
		id: 'app',
		js_src: '/main.js',
		initial_state: {},
		css: null
	};

	(0, _assign2.default)(params, opts || {});

	var css = params.css ? '<style type="text/css">' + params.css + '</style>' : '';
	var html_attributes = generateHtmlAttributesAsString(params.initial_state.documentMeta.htmlAttributes);
	var html_tag = html_attributes !== '' ? '<html ' + html_attributes + '>' : '<html>';

	return '\n\t<!doctype>\n\t' + html_tag + '\n\t\t<head>\n\t\t\t' + generateTitleAsString(params.initial_state.documentMeta.title) + '\n\t\t\t' + generateTagsAsString('meta', params.initial_state.documentMeta.meta) + '\n\t\t\t' + generateTagsAsString('base', [params.initial_state.documentMeta.base]) + '\n\t\t\t' + generateTagsAsString('link', params.initial_state.documentMeta.link) + '\n\t\t\t' + generateTagsAsString('style', params.initial_state.documentMeta.style) + '\n\t\t\t' + generateTagsAsString('script', params.initial_state.documentMeta.script) + '\n\t\t\t' + css + '\t\t\n\t\t</head>\n\t\t<body>\n\t\t\t<div id="' + params.id + '">' + html + '</div>\n\t\t\t<script>\n\t\t\t\twindow.__INITIAL_STATE__ = ' + (0, _stringify2.default)(params.initial_state) + '\n\t\t\t</script>\t\t\t\n\t\t\t<script src="' + params.js_src + '"></script>\n\t\t</body>\n\t</html>\n\t';
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