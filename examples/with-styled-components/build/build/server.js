/******/ (function(modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/ var installedModules = {}; // The require function
  /******/
  /******/ /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports;
      /******/
    } // Create a new module (and put it into the cache)
    /******/ /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {},
      /******/
    }); // Execute the module function
    /******/
    /******/ /******/ modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    ); // Flag the module as loaded
    /******/
    /******/ /******/ module.l = true; // Return the exports of the module
    /******/
    /******/ /******/ return module.exports;
    /******/
  } // expose the modules object (__webpack_modules__)
  /******/
  /******/
  /******/ /******/ __webpack_require__.m = modules; // expose the module cache
  /******/
  /******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
  /******/
  /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, {
        /******/ configurable: false,
        /******/ enumerable: true,
        /******/ get: getter,
        /******/
      });
      /******/
    }
    /******/
  }; // getDefaultExport function for compatibility with non-harmony modules
  /******/
  /******/ /******/ __webpack_require__.n = function(module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module['default'];
          }
        : /******/ function getModuleExports() {
            return module;
          };
    /******/ __webpack_require__.d(getter, 'a', getter);
    /******/ return getter;
    /******/
  }; // Object.prototype.hasOwnProperty.call
  /******/
  /******/ /******/ __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  }; // __webpack_public_path__
  /******/
  /******/ /******/ __webpack_require__.p = '/'; // Load entry module and return exports
  /******/
  /******/ /******/ return __webpack_require__((__webpack_require__.s = 0));
  /******/
})(
  /************************************************************************/
  /******/ {
    /***/ './build/build/assets.json': /***/ function(module, exports) {
      module.exports = {
        client: {
          js: '/static/js/bundle.86bcf8c7.js',
          css: '/static/css/bundle.66ee3d66.css',
        },
      };

      /***/
    },

    /***/ './build/src/About.js': /***/ function(
      module,
      __webpack_exports__,
      __webpack_require__
    ) {
      'use strict';
      Object.defineProperty(__webpack_exports__, '__esModule', { value: true });
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(
        'babel-runtime/core-js/object/get-prototype-of'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(
        'babel-runtime/helpers/classCallCheck'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(
        'babel-runtime/helpers/createClass'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(
        'babel-runtime/helpers/possibleConstructorReturn'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(
        'babel-runtime/helpers/inherits'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(
        'react'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_5_react__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_router_dom__ = __webpack_require__(
        'react-router-dom'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_router_dom___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_6_react_router_dom__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components__ = __webpack_require__(
        './build/src/components/index.js'
      );

      var About = (function(_React$Component) {
        __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(
          About,
          _React$Component
        );

        function About() {
          __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(
            this,
            About
          );

          return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(
            this,
            (
              About.__proto__ ||
              __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(
                About
              )
            ).apply(this, arguments)
          );
        }

        __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(
          About,
          [
            {
              key: 'render',
              value: function render() {
                return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
                  __WEBPACK_IMPORTED_MODULE_7__components__['b' /* Page */],
                  null,
                  __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_6_react_router_dom__['NavLink'],
                    { to: '/' },
                    'Home'
                  ),
                  __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_6_react_router_dom__['NavLink'],
                    { to: '/about' },
                    'About'
                  ),
                  __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
                    'h1',
                    null,
                    'About'
                  )
                );
              },
            },
          ]
        );

        return About;
      })(__WEBPACK_IMPORTED_MODULE_5_react___default.a.Component);

      /* harmony default export */ __webpack_exports__['default'] = About;

      /***/
    },

    /***/ './build/src/Home.js': /***/ function(
      module,
      __webpack_exports__,
      __webpack_require__
    ) {
      'use strict';
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(
        'babel-runtime/core-js/object/get-prototype-of'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(
        'babel-runtime/helpers/classCallCheck'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(
        'babel-runtime/helpers/createClass'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(
        'babel-runtime/helpers/possibleConstructorReturn'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(
        'babel-runtime/helpers/inherits'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(
        'react'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_5_react__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_router_dom__ = __webpack_require__(
        'react-router-dom'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_router_dom___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_6_react_router_dom__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__logo_svg__ = __webpack_require__(
        './build/src/logo.svg'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__logo_svg___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_7__logo_svg__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components__ = __webpack_require__(
        './build/src/components/index.js'
      );

      var Home = (function(_React$Component) {
        __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(
          Home,
          _React$Component
        );

        function Home() {
          __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(
            this,
            Home
          );

          return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(
            this,
            (
              Home.__proto__ ||
              __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(
                Home
              )
            ).apply(this, arguments)
          );
        }

        __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(
          Home,
          [
            {
              key: 'render',
              value: function render() {
                return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
                  __WEBPACK_IMPORTED_MODULE_8__components__['b' /* Page */],
                  null,
                  __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_8__components__['a' /* Logo */],
                    {
                      src: __WEBPACK_IMPORTED_MODULE_7__logo_svg___default.a,
                      alt: 'After.js Logo',
                    }
                  ),
                  __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_6_react_router_dom__['NavLink'],
                    { to: '/' },
                    'Home'
                  ),
                  __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_6_react_router_dom__['NavLink'],
                    { to: '/about' },
                    'About'
                  ),
                  __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
                    'h1',
                    null,
                    'Home'
                  )
                );
              },
            },
          ]
        );

        return Home;
      })(__WEBPACK_IMPORTED_MODULE_5_react___default.a.Component);

      /* harmony default export */ __webpack_exports__['a'] = Home;

      /***/
    },

    /***/ './build/src/_app.js': /***/ function(
      module,
      __webpack_exports__,
      __webpack_require__
    ) {
      'use strict';
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(
        'babel-runtime/helpers/defineProperty'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__ = __webpack_require__(
        'babel-runtime/core-js/object/assign'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(
        'babel-runtime/core-js/object/get-prototype-of'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__ = __webpack_require__(
        'babel-runtime/helpers/classCallCheck'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__ = __webpack_require__(
        'babel-runtime/helpers/createClass'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(
        'babel-runtime/helpers/possibleConstructorReturn'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__ = __webpack_require__(
        'babel-runtime/helpers/inherits'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react__ = __webpack_require__(
        'react'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_7_react__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_router_dom__ = __webpack_require__(
        'react-router-dom'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_router_dom___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_8_react_router_dom__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__loadInitialProps__ = __webpack_require__(
        './build/src/loadInitialProps.js'
      );

      var App = (function(_React$Component) {
        __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default()(
          App,
          _React$Component
        );

        function App(props) {
          __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default()(
            this,
            App
          );

          var _this = __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default()(
            this,
            (
              App.__proto__ ||
              __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default()(
                App
              )
            ).call(this, props)
          );

          _this.prefetch = function(pathname) {
            Object(
              __WEBPACK_IMPORTED_MODULE_9__loadInitialProps__['a' /* default */]
            )(_this.props.routes, pathname, {
              history: _this.props.history,
            })
              .then(function(data) {
                _this.prefetcherCache = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default()(
                  {},
                  _this.prefetcherCache,
                  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(
                    {},
                    pathname,
                    data[0]
                  )
                );
              })
              .catch(function(e) {
                return console.log(e);
              });
          };

          _this.updateData = function(data) {
            _this.setState({ data: data });
          };

          _this.state = {
            data: props.data,
            previousLocation: null,
          };
          _this.prefetcherCache = {};
          return _this;
        }

        // only runs clizzient

        __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default()(
          App,
          [
            {
              key: 'componentWillReceiveProps',
              value: function componentWillReceiveProps(nextProps, nextState) {
                var _this2 = this;

                var navigated = nextProps.location !== this.props.location;
                if (navigated) {
                  window.scrollTo(0, 0);
                  // save the location so we can render the old screen
                  this.setState({
                    previousLocation: this.props.location,
                    data: undefined, // unless you want to keep it
                  });
                  Object(
                    __WEBPACK_IMPORTED_MODULE_9__loadInitialProps__[
                      'a' /* default */
                    ]
                  )(this.props.routes, nextProps.location.pathname, {
                    location: nextProps.location,
                    history: nextProps.history,
                  })
                    .then(function(data) {
                      _this2.setState({
                        previousLocation: null,
                        data: data[0],
                      });
                    })
                    .catch(function(e) {
                      // @todo we should more cleverly handle errors???
                      console.log(e);
                    });
                }
              },
            },
            {
              key: 'render',
              value: function render() {
                var _this3 = this;

                var _state = this.state,
                  previousLocation = _state.previousLocation,
                  data = _state.data;
                var _props = this.props,
                  location = _props.location,
                  history = _props.history,
                  match = _props.match;

                var initialData = this.prefetcherCache[location.pathname]
                  ? this.prefetcherCache[location.pathname]
                  : data;

                return __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
                  __WEBPACK_IMPORTED_MODULE_8_react_router_dom__['Switch'],
                  null,
                  this.props.routes.map(function(r, i) {
                    return __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
                      __WEBPACK_IMPORTED_MODULE_8_react_router_dom__['Route'],
                      {
                        key: 'route--' + i,
                        path: r.path,
                        exact: r.exact,
                        location: previousLocation || location,
                        render: function render(props) {
                          return __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
                            r.component,
                            __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default()(
                              {},
                              initialData,
                              {
                                history: history,
                                location: previousLocation || location,
                                match: match,
                                prefetch: _this3.prefetch,
                              }
                            )
                          );
                        },
                      }
                    );
                  })
                );
              },
            },
          ]
        );

        return App;
      })(__WEBPACK_IMPORTED_MODULE_7_react___default.a.Component);

      /* harmony default export */ __webpack_exports__['a'] = Object(
        __WEBPACK_IMPORTED_MODULE_8_react_router_dom__['withRouter']
      )(App);

      /***/
    },

    /***/ './build/src/_document.js': /***/ function(
      module,
      __webpack_exports__,
      __webpack_require__
    ) {
      'use strict';
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__(
        'babel-runtime/core-js/object/assign'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__ = __webpack_require__(
        'babel-runtime/core-js/json/stringify'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(
        'babel-runtime/core-js/object/get-prototype-of'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__ = __webpack_require__(
        'babel-runtime/helpers/classCallCheck'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__ = __webpack_require__(
        'babel-runtime/helpers/createClass'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(
        'babel-runtime/helpers/possibleConstructorReturn'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__ = __webpack_require__(
        'babel-runtime/helpers/inherits'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react__ = __webpack_require__(
        'react'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_7_react__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_styled_components__ = __webpack_require__(
        'styled-components'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_styled_components___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_8_styled_components__
      );

      var Document = (function(_React$Component) {
        __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default()(
          Document,
          _React$Component
        );

        function Document() {
          __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default()(
            this,
            Document
          );

          return __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default()(
            this,
            (
              Document.__proto__ ||
              __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default()(
                Document
              )
            ).apply(this, arguments)
          );
        }

        __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default()(
          Document,
          [
            {
              key: 'render',
              value: function render() {
                var _props = this.props,
                  helmet = _props.helmet,
                  assets = _props.assets,
                  data = _props.data,
                  styleTags = _props.styleTags;

                var htmlAttrs = helmet.htmlAttributes.toComponent();
                var bodyAttrs = helmet.bodyAttributes.toComponent();

                return __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
                  'html',
                  htmlAttrs,
                  __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
                    'head',
                    null,
                    __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
                      'meta',
                      { httpEquiv: 'X-UA-Compatible', content: 'IE=edge' }
                    ),
                    __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
                      'meta',
                      { charSet: 'utf-8' }
                    ),
                    __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
                      'title',
                      null,
                      'Styled-Components Example'
                    ),
                    __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
                      'meta',
                      {
                        name: 'viewport',
                        content: 'width=device-width, initial-scale=1',
                      }
                    ),
                    helmet.title.toComponent(),
                    helmet.meta.toComponent(),
                    helmet.link.toComponent(),
                    styleTags
                  ),
                  __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
                    'body',
                    bodyAttrs,
                    __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
                      'div',
                      { id: 'root' }
                    ),
                    data &&
                      __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
                        'script',
                        {
                          type: 'text/javascript',
                          dangerouslySetInnerHTML: {
                            __html:
                              ' window.__AFTER__ = ' +
                              __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default()(
                                data
                              ) +
                              '; ',
                          },
                        }
                      ),
                    __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
                      'script',
                      {
                        type: 'text/javascript',
                        src: assets.client.js,
                        defer: true,
                        crossOrigin: 'anonymous',
                      }
                    )
                  )
                );
              },
            },
          ],
          [
            {
              key: 'getInitialProps',
              value: function getInitialProps(_ref) {
                var assets = _ref.assets,
                  data = _ref.data,
                  renderPage = _ref.renderPage;

                var sheet = new __WEBPACK_IMPORTED_MODULE_8_styled_components__[
                  'ServerStyleSheet'
                ]();
                var page = renderPage(function(App) {
                  return function(props) {
                    return sheet.collectStyles(
                      __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
                        App,
                        props
                      )
                    );
                  };
                });
                var styleTags = sheet.getStyleElement();
                return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()(
                  { assets: assets, data: data },
                  page,
                  { styleTags: styleTags }
                );
              },
            },
          ]
        );

        return Document;
      })(__WEBPACK_IMPORTED_MODULE_7_react___default.a.Component);

      /* harmony default export */ __webpack_exports__['a'] = Document;

      /***/
    },

    /***/ './build/src/_routes.js': /***/ function(
      module,
      __webpack_exports__,
      __webpack_require__
    ) {
      'use strict';
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_css__ = __webpack_require__(
        './build/src/index.css'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_css___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_0__index_css__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(
        'react'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_1_react__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__jaredpalmer_after_asyncComponent__ = __webpack_require__(
        '@jaredpalmer/after/asyncComponent'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__jaredpalmer_after_asyncComponent___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_2__jaredpalmer_after_asyncComponent__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Home__ = __webpack_require__(
        './build/src/Home.js'
      );

      /* harmony default export */ __webpack_exports__['a'] = [
        {
          path: '/',
          exact: true,
          component: __WEBPACK_IMPORTED_MODULE_3__Home__['a' /* default */],
        },
        {
          path: '/about',
          exact: true,
          component: __WEBPACK_IMPORTED_MODULE_2__jaredpalmer_after_asyncComponent___default()(
            {
              loader: function loader() {
                return new Promise(function(resolve) {
                  resolve();
                }).then(__webpack_require__.bind(null, './build/src/About.js'));
              },
              Placeholder: function Placeholder() {
                return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                  'div',
                  null,
                  'LOADING...'
                );
              },
            }
          ),
        },
      ];

      /***/
    },

    /***/ './build/src/components/Logo.js': /***/ function(
      module,
      __webpack_exports__,
      __webpack_require__
    ) {
      'use strict';
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_styled_components__ = __webpack_require__(
        'styled-components'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_styled_components___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_0_styled_components__
      );

      var Logo = __WEBPACK_IMPORTED_MODULE_0_styled_components___default.a.img.withConfig(
        {
          displayName: 'Logo',
          componentId: 's1r98sni-0',
        }
      )(['width:100%;max-width:200px;display:block;margin:0 auto 2rem;']);

      /* harmony default export */ __webpack_exports__['a'] = Logo;

      /***/
    },

    /***/ './build/src/components/Page.js': /***/ function(
      module,
      __webpack_exports__,
      __webpack_require__
    ) {
      'use strict';
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_styled_components__ = __webpack_require__(
        'styled-components'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_styled_components___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_0_styled_components__
      );

      var Page = __WEBPACK_IMPORTED_MODULE_0_styled_components___default.a.div.withConfig(
        {
          displayName: 'Page',
          componentId: 's1dmgy1y-0',
        }
      )(['text-align:center;padding:2rem;margin:0 auto;']);

      /* harmony default export */ __webpack_exports__['a'] = Page;

      /***/
    },

    /***/ './build/src/components/index.js': /***/ function(
      module,
      __webpack_exports__,
      __webpack_require__
    ) {
      'use strict';
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Logo__ = __webpack_require__(
        './build/src/components/Logo.js'
      );
      /* harmony reexport (binding) */ __webpack_require__.d(
        __webpack_exports__,
        'a',
        function() {
          return __WEBPACK_IMPORTED_MODULE_0__Logo__['a'];
        }
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Page__ = __webpack_require__(
        './build/src/components/Page.js'
      );
      /* harmony reexport (binding) */ __webpack_require__.d(
        __webpack_exports__,
        'b',
        function() {
          return __WEBPACK_IMPORTED_MODULE_1__Page__['a'];
        }
      );

      /***/
    },

    /***/ './build/src/index.css': /***/ function(
      module,
      exports,
      __webpack_require__
    ) {
      exports = module.exports = __webpack_require__(
        './node_modules/css-loader/lib/css-base.js'
      )(undefined);
      // imports

      // module
      exports.push([
        module.i,
        "body {\n  margin: 0;\n  padding: 0;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,\n    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';\n}\n\na {\n  margin-right: 1rem;\n}\n",
        '',
      ]);

      // exports

      /***/
    },

    /***/ './build/src/index.js': /***/ function(
      module,
      __webpack_exports__,
      __webpack_require__
    ) {
      'use strict';
      Object.defineProperty(__webpack_exports__, '__esModule', { value: true });
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_http__ = __webpack_require__(
        'http'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_http___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_0_http__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__server__ = __webpack_require__(
        './build/src/server.js'
      );

      var server = __WEBPACK_IMPORTED_MODULE_0_http___default.a.createServer(
        __WEBPACK_IMPORTED_MODULE_1__server__['a' /* default */]
      );

      var port = 3000 || 3000;

      var currentApp = __WEBPACK_IMPORTED_MODULE_1__server__['a' /* default */];
      server.listen(port, function(err) {
        if (err) {
          console.log(err);
        }
        console.log('> Started server on port ' + port);
      });

      if (false) {
        module.hot.accept('./server', function() {
          server.removeListener('request', currentApp);
          server.on('request', app);
          currentApp = app;
        });
      }

      /***/
    },

    /***/ './build/src/loadInitialProps.js': /***/ function(
      module,
      __webpack_exports__,
      __webpack_require__
    ) {
      'use strict';
      /* harmony export (immutable) */ __webpack_exports__[
        'a'
      ] = loadInitialProps;
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__(
        'babel-runtime/core-js/promise'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__ = __webpack_require__(
        'babel-runtime/core-js/object/assign'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_dom__ = __webpack_require__(
        'react-router-dom'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_dom___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_2_react_router_dom__
      );

      function loadInitialProps(routes, pathname, ctx) {
        var promises = [];
        routes.some(function(route) {
          var match = Object(
            __WEBPACK_IMPORTED_MODULE_2_react_router_dom__['matchPath']
          )(pathname, route);
          if (match && route.component.getInitialProps) {
            promises.push(
              route.component.load
                ? route.component
                    .load() // load it as well
                    .then(function() {
                      return route.component
                        .getInitialProps(
                          __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default()(
                            { match: match },
                            ctx
                          )
                        )
                        .catch(function() {});
                    })
                : route.component
                    .getInitialProps(
                      __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default()(
                        { match: match },
                        ctx
                      )
                    )
                    .catch(function() {})
            );
          }
          return !!match;
        });
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.all(
          promises
        );
      }

      /***/
    },

    /***/ './build/src/logo.svg': /***/ function(
      module,
      exports,
      __webpack_require__
    ) {
      module.exports = __webpack_require__.p + 'static/media/logo.c9d5418b.svg';

      /***/
    },

    /***/ './build/src/server.js': /***/ function(
      module,
      __webpack_exports__,
      __webpack_require__
    ) {
      'use strict';
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(
        'babel-runtime/regenerator'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties__ = __webpack_require__(
        'babel-runtime/helpers/objectWithoutProperties'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(
        'babel-runtime/helpers/asyncToGenerator'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app__ = __webpack_require__(
        './build/src/_app.js'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__routes__ = __webpack_require__(
        './build/src/_routes.js'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__document__ = __webpack_require__(
        './build/src/_document.js'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__loadInitialProps__ = __webpack_require__(
        './build/src/loadInitialProps.js'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react__ = __webpack_require__(
        'react'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_7_react__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_url__ = __webpack_require__(
        'url'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_url___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_8_url__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react_helmet__ = __webpack_require__(
        'react-helmet'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react_helmet___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_9_react_helmet__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_react_dom_server__ = __webpack_require__(
        'react-dom/server'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_react_dom_server___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_10_react_dom_server__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_express__ = __webpack_require__(
        'express'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_express___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_11_express__
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_react_router_dom__ = __webpack_require__(
        'react-router-dom'
      );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_react_router_dom___default = __webpack_require__.n(
        __WEBPACK_IMPORTED_MODULE_12_react_router_dom__
      );

      var _this = this;

      var assets = __webpack_require__('./build/build/assets.json');
      var server = __WEBPACK_IMPORTED_MODULE_11_express___default()();

      var modPageFn = function modPageFn(Page) {
        return function(props) {
          return __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
            Page,
            props
          );
        };
      };

      server
        .disable('x-powered-by')
        .use(
          __WEBPACK_IMPORTED_MODULE_11_express___default.a.static(
            '/Users/assim/Documents/Projects/after.js/examples/with-styled-components/build/build/public'
          )
        )
        .get(
          '/*',
          (function() {
            var _ref = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()(
              /*#__PURE__*/ __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(
                function _callee(req, res) {
                  var context, data, renderPage, _ref2, html, docProps, doc;

                  return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(
                    function _callee$(_context) {
                      while (1) {
                        switch ((_context.prev = _context.next)) {
                          case 0:
                            _context.prev = 0;
                            context = {};
                            _context.next = 4;
                            return Object(
                              __WEBPACK_IMPORTED_MODULE_6__loadInitialProps__[
                                'a' /* default */
                              ]
                            )(
                              __WEBPACK_IMPORTED_MODULE_4__routes__[
                                'a' /* default */
                              ],
                              __WEBPACK_IMPORTED_MODULE_8_url___default.a.parse(
                                req.url
                              ).pathname,
                              {
                                req: req,
                                res: res,
                              }
                            );

                          case 4:
                            data = _context.sent;

                            renderPage = function renderPage() {
                              var fn =
                                arguments.length > 0 &&
                                arguments[0] !== undefined
                                  ? arguments[0]
                                  : modPageFn;

                              var html = __WEBPACK_IMPORTED_MODULE_10_react_dom_server___default.a.renderToString(
                                __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
                                  __WEBPACK_IMPORTED_MODULE_12_react_router_dom__[
                                    'StaticRouter'
                                  ],
                                  { location: req.url, context: context },
                                  fn(
                                    __WEBPACK_IMPORTED_MODULE_3__app__[
                                      'a' /* default */
                                    ]
                                  )({
                                    routes:
                                      __WEBPACK_IMPORTED_MODULE_4__routes__[
                                        'a' /* default */
                                      ],
                                    data: data[0],
                                  })
                                )
                              );
                              var helmet = __WEBPACK_IMPORTED_MODULE_9_react_helmet___default.a.renderStatic();
                              return { html: html, helmet: helmet };
                            };

                            _context.next = 8;
                            return __WEBPACK_IMPORTED_MODULE_5__document__[
                              'a' /* default */
                            ].getInitialProps({
                              req: req,
                              res: res,
                              assets: assets,
                              renderPage: renderPage,
                              data: data[0],
                            });

                          case 8:
                            _ref2 = _context.sent;
                            html = _ref2.html;
                            docProps = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties___default()(
                              _ref2,
                              ['html']
                            );
                            doc = __WEBPACK_IMPORTED_MODULE_10_react_dom_server___default.a.renderToStaticMarkup(
                              __WEBPACK_IMPORTED_MODULE_7_react___default.a.createElement(
                                __WEBPACK_IMPORTED_MODULE_5__document__[
                                  'a' /* default */
                                ],
                                docProps
                              )
                            );

                            res.send(
                              '<!doctype html>' +
                                doc.replace(
                                  'DO_NOT_DELETE_THIS_YOU_WILL_BREAK_YOUR_APP',
                                  html
                                )
                            );
                            _context.next = 18;
                            break;

                          case 15:
                            _context.prev = 15;
                            _context.t0 = _context['catch'](0);

                            res.json(_context.t0);

                          case 18:
                          case 'end':
                            return _context.stop();
                        }
                      }
                    },
                    _callee,
                    _this,
                    [[0, 15]]
                  );
                }
              )
            );

            return function(_x, _x2) {
              return _ref.apply(this, arguments);
            };
          })()
        );

      /* harmony default export */ __webpack_exports__['a'] = server;

      /***/
    },

    /***/ './node_modules/css-loader/lib/css-base.js': /***/ function(
      module,
      exports
    ) {
      /*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
      // css base code, injected by the css-loader
      module.exports = function(useSourceMap) {
        var list = [];

        // return the list of modules as css string
        list.toString = function toString() {
          return this.map(function(item) {
            var content = cssWithMappingToString(item, useSourceMap);
            if (item[2]) {
              return '@media ' + item[2] + '{' + content + '}';
            } else {
              return content;
            }
          }).join('');
        };

        // import a list of modules into the list
        list.i = function(modules, mediaQuery) {
          if (typeof modules === 'string') modules = [[null, modules, '']];
          var alreadyImportedModules = {};
          for (var i = 0; i < this.length; i++) {
            var id = this[i][0];
            if (typeof id === 'number') alreadyImportedModules[id] = true;
          }
          for (i = 0; i < modules.length; i++) {
            var item = modules[i];
            // skip already imported module
            // this implementation is not 100% perfect for weird media query combinations
            //  when a module is imported multiple times with different media queries.
            //  I hope this will never occur (Hey this way we have smaller bundles)
            if (
              typeof item[0] !== 'number' ||
              !alreadyImportedModules[item[0]]
            ) {
              if (mediaQuery && !item[2]) {
                item[2] = mediaQuery;
              } else if (mediaQuery) {
                item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';
              }
              list.push(item);
            }
          }
        };
        return list;
      };

      function cssWithMappingToString(item, useSourceMap) {
        var content = item[1] || '';
        var cssMapping = item[3];
        if (!cssMapping) {
          return content;
        }

        if (useSourceMap && typeof btoa === 'function') {
          var sourceMapping = toComment(cssMapping);
          var sourceURLs = cssMapping.sources.map(function(source) {
            return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
          });

          return [content]
            .concat(sourceURLs)
            .concat([sourceMapping])
            .join('\n');
        }

        return [content].join('\n');
      }

      // Adapted from convert-source-map (MIT)
      function toComment(sourceMap) {
        // eslint-disable-next-line no-undef
        var base64 = btoa(
          unescape(encodeURIComponent(JSON.stringify(sourceMap)))
        );
        var data =
          'sourceMappingURL=data:application/json;charset=utf-8;base64,' +
          base64;

        return '/*# ' + data + ' */';
      }

      /***/
    },

    /***/ 0: /***/ function(module, exports, __webpack_require__) {
      module.exports = __webpack_require__('./build/src/index.js');

      /***/
    },

    /***/ '@jaredpalmer/after/asyncComponent': /***/ function(module, exports) {
      module.exports = require('@jaredpalmer/after/asyncComponent');

      /***/
    },

    /***/ 'babel-runtime/core-js/json/stringify': /***/ function(
      module,
      exports
    ) {
      module.exports = require('babel-runtime/core-js/json/stringify');

      /***/
    },

    /***/ 'babel-runtime/core-js/object/assign': /***/ function(
      module,
      exports
    ) {
      module.exports = require('babel-runtime/core-js/object/assign');

      /***/
    },

    /***/ 'babel-runtime/core-js/object/get-prototype-of': /***/ function(
      module,
      exports
    ) {
      module.exports = require('babel-runtime/core-js/object/get-prototype-of');

      /***/
    },

    /***/ 'babel-runtime/core-js/promise': /***/ function(module, exports) {
      module.exports = require('babel-runtime/core-js/promise');

      /***/
    },

    /***/ 'babel-runtime/helpers/asyncToGenerator': /***/ function(
      module,
      exports
    ) {
      module.exports = require('babel-runtime/helpers/asyncToGenerator');

      /***/
    },

    /***/ 'babel-runtime/helpers/classCallCheck': /***/ function(
      module,
      exports
    ) {
      module.exports = require('babel-runtime/helpers/classCallCheck');

      /***/
    },

    /***/ 'babel-runtime/helpers/createClass': /***/ function(module, exports) {
      module.exports = require('babel-runtime/helpers/createClass');

      /***/
    },

    /***/ 'babel-runtime/helpers/defineProperty': /***/ function(
      module,
      exports
    ) {
      module.exports = require('babel-runtime/helpers/defineProperty');

      /***/
    },

    /***/ 'babel-runtime/helpers/inherits': /***/ function(module, exports) {
      module.exports = require('babel-runtime/helpers/inherits');

      /***/
    },

    /***/ 'babel-runtime/helpers/objectWithoutProperties': /***/ function(
      module,
      exports
    ) {
      module.exports = require('babel-runtime/helpers/objectWithoutProperties');

      /***/
    },

    /***/ 'babel-runtime/helpers/possibleConstructorReturn': /***/ function(
      module,
      exports
    ) {
      module.exports = require('babel-runtime/helpers/possibleConstructorReturn');

      /***/
    },

    /***/ 'babel-runtime/regenerator': /***/ function(module, exports) {
      module.exports = require('babel-runtime/regenerator');

      /***/
    },

    /***/ express: /***/ function(module, exports) {
      module.exports = require('express');

      /***/
    },

    /***/ http: /***/ function(module, exports) {
      module.exports = require('http');

      /***/
    },

    /***/ react: /***/ function(module, exports) {
      module.exports = require('react');

      /***/
    },

    /***/ 'react-dom/server': /***/ function(module, exports) {
      module.exports = require('react-dom/server');

      /***/
    },

    /***/ 'react-helmet': /***/ function(module, exports) {
      module.exports = require('react-helmet');

      /***/
    },

    /***/ 'react-router-dom': /***/ function(module, exports) {
      module.exports = require('react-router-dom');

      /***/
    },

    /***/ 'styled-components': /***/ function(module, exports) {
      module.exports = require('styled-components');

      /***/
    },

    /***/ url: /***/ function(module, exports) {
      module.exports = require('url');

      /***/
    },

    /******/
  }
);
//# sourceMappingURL=server.js.map
