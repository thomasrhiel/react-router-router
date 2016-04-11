'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _reactDom = require('react-dom');

var _utils = require('./utils');

exports['default'] = function (routes) {
	var reducers = arguments.length <= 1 || arguments[1] === undefined ? (0, _utils.getBasicReducers)() : arguments[1];
	var _window$location = window.location;
	var pathname = _window$location.pathname;
	var search = _window$location.search;
	var hash = _window$location.hash;

	var location = '' + pathname + search + hash;
	var initialState = window.__INITIAL_STATE__;
	var store = (0, _redux.createStore)(reducers, initialState);

	(0, _reactRouter.match)({ routes: routes, location: location }, function () {
		(0, _reactDom.render)(_react2['default'].createElement(
			_reactRedux.Provider,
			{ store: store },
			_react2['default'].createElement(_reactRouter.Router, { routes: routes, history: _reactRouter.browserHistory })
		), document.getElementById('app'));
	});
};

module.exports = exports['default'];