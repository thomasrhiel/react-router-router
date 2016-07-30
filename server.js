'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (params) {
	var defaults = {
		routes: null,
		reducers: (0, _utils.getBasicReducers)(),
		beforeRenderToString: defaultBeforeRenderToString,
		afterRenderToString: defaultAfterRenderToString
	};

	params = Object.assign(defaults, params);
	params.store = (0, _redux.createStore)(params.reducers);

	router.get('*', function (req, res, next) {
		renderSite(req, res, params);
	});

	return router;
};

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _server = require('react-dom/server');

var _reactRouter = require('react-router');

var _utils = require('./utils');

var _appContext = require('./app-context');

var _appContext2 = _interopRequireDefault(_appContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function renderSiteToString(store, renderProps, context) {
	return (0, _server.renderToString)(_react2.default.createElement(
		_appContext2.default,
		{ insertCss: context },
		_react2.default.createElement(
			_reactRedux.Provider,
			{ store: store },
			_react2.default.createElement(_reactRouter.RouterContext, renderProps)
		)
	));
}

function _doRenderSite(req, res, store, renderProps, beforeRenderToString, afterRenderToString) {
	var _this = this;

	beforeRenderToString.call(this, req, store, function (req, store) {
		var context = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

		var html_string = renderSiteToString(store, renderProps, context);

		// there's an opportunity here to pass more arguments to the html renderer (e.g., react-document-title)
		afterRenderToString.call(_this, req, store, html_string, function (req, store, html_string, css) {
			var initial_state = store.getState();
			console.log(css);
			res.status(200).send((0, _utils.createPage)(html_string, { initial_state: initial_state, css: css }));
		});
	});
}

function renderSite(req, res, params) {
	var routes = params.routes;
	var store = params.store;
	var beforeRenderToString = params.beforeRenderToString;
	var afterRenderToString = params.afterRenderToString;


	(0, _reactRouter.match)({ routes: routes, location: req.url }, function (error, redirectLocation, renderProps) {
		if (error) {
			res.status(500).send(error.message);
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search);
		} else if (renderProps) {
			_doRenderSite(req, res, store, renderProps, beforeRenderToString, afterRenderToString);
		} else {
			res.status(404).send('Not found');
		}
	});
}

function defaultBeforeRenderToString(req, store, cb) {
	cb.call(this, req, store);
}

function defaultAfterRenderToString(req, store, html_string, cb) {
	cb.call(this, req, store, html_string);
}

var router = _express2.default.Router();