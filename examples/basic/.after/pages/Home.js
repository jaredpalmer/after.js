'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inherits2 = require('/Users/jared/workspace/anne/packages/after/node_modules/babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _getPrototypeOf = require('/Users/jared/workspace/anne/packages/after/node_modules/babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('/Users/jared/workspace/anne/packages/after/node_modules/babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('/Users/jared/workspace/anne/packages/after/node_modules/babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('/Users/jared/workspace/anne/packages/after/node_modules/babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _index = require('/Users/jared/workspace/anne/packages/after/node_modules/react/index.js');

var _index2 = _interopRequireDefault(_index);

var _Nav = require('../components/Nav');

var _Nav2 = _interopRequireDefault(_Nav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Home = function (_React$Component) {
  (0, _inherits3.default)(Home, _React$Component);

  function Home() {
    (0, _classCallCheck3.default)(this, Home);
    return (0, _possibleConstructorReturn3.default)(this, (Home.__proto__ || (0, _getPrototypeOf2.default)(Home)).apply(this, arguments));
  }

  (0, _createClass3.default)(Home, [{
    key: 'render',
    value: function render() {
      return _index2.default.createElement(
        'div',
        null,
        _index2.default.createElement(_Nav2.default, null),
        'Home'
      );
    }
  }]);
  return Home;
}(_index2.default.Component);

exports.default = Home;