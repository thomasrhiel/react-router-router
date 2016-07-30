'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.default = function (params) {
	var routes = params.routes;
	var _params$reducers = params.reducers;
	var reducers = _params$reducers === undefined ? {} : _params$reducers;
	var _window$location = window.location;
	var pathname = _window$location.pathname;
	var search = _window$location.search;
	var hash = _window$location.hash;

	var location = '' + pathname + search + hash;
	var initialState = window.__INITIAL_STATE__;

	(0, _assign2.default)(reducers, (0, _utils.getBasicReducers)());
	var store = (0, _redux.createStore)((0, _redux.combineReducers)(reducers), initialState);
	var context = function context(styles) {
		return styles._insertCss();
	};

	(0, _reactRouter.match)({ routes: routes, location: location }, function () {
		(0, _reactDom.render)(_react2.default.createElement(
			_reactRedux.Provider,
			{ store: store },
			_react2.default.createElement(
				_appContext2.default,
				{ insertCss: context },
				_react2.default.createElement(_reactRouter.Router, { routes: routes, history: _reactRouter.browserHistory })
			)
		), document.getElementById('app'));
	});
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _reactDom = require('react-dom');

var _utils = require('./utils');

var _appContext = require('./app-context');

var _appContext2 = _interopRequireDefault(_appContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }