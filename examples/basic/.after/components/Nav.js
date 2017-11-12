'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('/Users/jared/workspace/anne/packages/after/node_modules/react/index.js');

var _index2 = _interopRequireDefault(_index);

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return _index2.default.createElement(
    'div',
    null,
    _index2.default.createElement(
      _reactRouterDom.Link,
      { to: '/' },
      'Home'
    ),
    ' ',
    _index2.default.createElement(
      _reactRouterDom.Link,
      { to: '/about' },
      'About'
    )
  );
};