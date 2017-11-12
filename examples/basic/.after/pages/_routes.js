'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Home = require('./Home');

var _Home2 = _interopRequireDefault(_Home);

var _About = require('./About');

var _About2 = _interopRequireDefault(_About);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = [{
  path: '/',
  exact: true,
  component: _Home2.default
}, {
  path: '/about',
  component: _About2.default
}];

exports.default = routes;