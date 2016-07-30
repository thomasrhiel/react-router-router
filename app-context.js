'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var func = _react2.default.PropTypes.func;
exports.default = _react2.default.createClass({
  displayName: 'app-context',


  childContextTypes: {
    insertCss: func
  },

  getChildContext: function getChildContext() {
    return {
      insertCss: this.props.insertCss
    };
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      null,
      this.props.children
    );
  }
});