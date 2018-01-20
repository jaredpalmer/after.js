webpackJsonp([0], {
  './build/src/About.js': function(e, n, t) {
    'use strict';
    Object.defineProperty(n, '__esModule', { value: !0 });
    var o = t(
        './node_modules/babel-runtime/core-js/object/get-prototype-of.js'
      ),
      r = t.n(o),
      s = t('./node_modules/babel-runtime/helpers/classCallCheck.js'),
      l = t.n(s),
      u = t('./node_modules/babel-runtime/helpers/createClass.js'),
      a = t.n(u),
      d = t(
        './node_modules/babel-runtime/helpers/possibleConstructorReturn.js'
      ),
      i = t.n(d),
      c = t('./node_modules/babel-runtime/helpers/inherits.js'),
      b = t.n(c),
      m = t('./node_modules/react/index.js'),
      p = t.n(m),
      _ = t('./node_modules/react-router-dom/index.js'),
      j = (t.n(_), t('./build/src/components/index.js')),
      h = (function(e) {
        function n() {
          return (
            l()(this, n),
            i()(this, (n.__proto__ || r()(n)).apply(this, arguments))
          );
        }
        return (
          b()(n, e),
          a()(n, [
            {
              key: 'render',
              value: function() {
                return p.a.createElement(
                  j.b,
                  null,
                  p.a.createElement(_.NavLink, { to: '/' }, 'Home'),
                  p.a.createElement(_.NavLink, { to: '/about' }, 'About'),
                  p.a.createElement('h1', null, 'About')
                );
              },
            },
          ]),
          n
        );
      })(p.a.Component);
    n.default = h;
  },
});
//# sourceMappingURL=0.10dfa54d.chunk.js.map
