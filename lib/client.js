'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = SitemakerClient;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactDom = require('react-dom');

// calling `match` is simply for side effects of
// loading route/component code for the initial location

function SitemakerClient(routes) {
	var _window$location = window.location;
	var pathname = _window$location.pathname;
	var search = _window$location.search;
	var hash = _window$location.hash;

	var location = '' + pathname + search + hash;

	(0, _reactRouter.match)({ routes: routes, location: location }, function () {
		(0, _reactDom.render)(_react2['default'].createElement(_reactRouter.Router, { routes: routes, history: _reactRouter.browserHistory }), document.getElementById('app'));
	});
}

module.exports = exports['default'];