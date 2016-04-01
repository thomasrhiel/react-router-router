'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.createPage = createPage;

function createPage(html, opts) {
	var params = {
		id: 'app',
		js_src: 'main.js'
	};

	Object.assign(params, opts || {});

	return '\n\t<!doctype html>\n\t<html>\n\t\t<head>\n\t\t\t<title>sitemaker.xyz</title>\n\t\t\t<meta charset="utf-8"/>\t\t\t\n\t\t\t<meta name="viewport" content="width=device-width, user-scalable=no, maximum-scale=1, initial-scale=1"/>\n\t\t</head>\n\t\t<body>\n\t\t\t<div id="' + params.id + '">' + html + '</div>\n\t\t\t<script src="' + params.js_src + '"></script>\n\t\t</body>\n\t</html>\n\t';
}