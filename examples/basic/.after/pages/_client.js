'use strict';

var _react = require('/Users/jared/workspace/anne/packages/after/node_modules/react/index.js');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _App = require('@jaredpalmer/after/dist/lib/App');

var _App2 = _interopRequireDefault(_App);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _reactRouterDom = require('react-router-dom');

var _routes = require('./_routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

_reactDom2.default.hydrate(_react2.default.createElement(_reactRouterDom.BrowserRouter, null, _react2.default.createElement(_App2.default, { routes: _routes2.default })), document.getElementById('root'));