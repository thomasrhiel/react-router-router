'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouterClient = exports.RouterServer = undefined;

var _server = require('./server');

var _server2 = _interopRequireDefault(_server);

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.RouterServer = _server2.default;
exports.RouterClient = _client2.default;