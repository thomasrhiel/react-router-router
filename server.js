'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _reactDomServer = require('react-dom/server');

var _reactRouter = require('react-router');

var _utils = require('./utils');

function renderSiteToString(store, renderProps) {
	return (0, _reactDomServer.renderToString)(_react2['default'].createElement(
		_reactRedux.Provider,
		{ store: store },
		_react2['default'].createElement(_reactRouter.RouterContext, renderProps)
	));
}

function _doRenderSite(req, res, store, renderProps, prerender, postrender) {
	var _this = this;

	prerender.call(this, req, store, function (req, store) {
		var html_string = renderSiteToString(store, renderProps);

		// there's an opportunity here to pass more arguments to the html renderer (e.g., react-document-title)
		postrender.call(_this, req, store, html_string, function (req, store, html_string) {
			var initial_state = store.getState();
			res.status(200).send((0, _utils.createPage)(html_string, { initial_state: initial_state }));
		});
	});
}

function renderSite(req, res, params) {
	var routes = params.routes;
	var store = params.store;
	var prerender = params.prerender;
	var postrender = params.postrender;

	(0, _reactRouter.match)({ routes: routes, location: req.url }, function (error, redirectLocation, renderProps) {
		if (error) {
			res.status(500).send(error.message);
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search);
		} else if (renderProps) {
			_doRenderSite(req, res, store, renderProps, prerender, postrender);
		} else {
			res.status(404).send('Not found');
		}
	});
}

function defaultPrerender(req, store, cb) {
	cb.call(this, req, store);
}

function defaultPostrender(req, store, html_string, cb) {
	cb.call(this, req, store, html_string);
}

var router = _express2['default'].Router();

exports['default'] = function (params) {
	var defaults = {
		routes: null,
		reducers: (0, _utils.getBasicReducers)(),
		prerender: defaultPrerender,
		postrender: defaultPostrender
	};

	params = Object.assign(defaults, params);
	params.store = (0, _redux.createStore)(params.reducers);

	router.get('*', function (req, res, next) {
		renderSite(req, res, params);
	});

	return router;
};

module.exports = exports['default'];