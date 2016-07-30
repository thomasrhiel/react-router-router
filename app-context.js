'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var func = _react2.default.PropTypes.func;

var AppContext = _react2.default.createClass({
  displayName: 'AppContext',


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
      _react2.default.createElement(_reactHelmet2.default, { title: this.props.documentMeta.title }),
      this.props.children
    );
  }
});

function select(state) {
  return {
    documentMeta: state.documentMeta
  };
}

exports.default = (0, _reactRedux.connect)(select)(AppContext);