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

function renderSite(req, res, routes, store) {
	if (typeof store === 'undefined') {
		store = (0, _utils.getBasicStore)();
	}

	(0, _reactRouter.match)({ routes: routes, location: req.url }, function (error, redirectLocation, renderProps) {
		if (error) {
			res.status(500).send(error.message);
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search);
		} else if (renderProps) {
			res.status(200).send((0, _utils.createPage)((0, _reactDomServer.renderToString)(_react2['default'].createElement(
				_reactRedux.Provider,
				{ store: store },
				_react2['default'].createElement(_reactRouter.RouterContext, renderProps)
			))));
		} else {
			res.status(404).send('Not found');
		}
	});
}

var router = _express2['default'].Router();

exports['default'] = function (routes, store) {
	router.get('*', function (req, res, next) {

		if (typeof routes === 'function') {
			routes = routes.call(this, req, res);
		}

		renderSite(req, res, routes, store);
	});
	return router;
};

module.exports = exports['default'];