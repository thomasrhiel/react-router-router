'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _server = require('./server');

var _server2 = _interopRequireDefault(_server);

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

exports.SitemakerRouter = _server2['default'];
exports.SitemakerClient = _client2['default'];