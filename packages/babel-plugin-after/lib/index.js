'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = _default;

var _pluginSyntaxDynamicImport = _interopRequireDefault(
  require('@babel/plugin-syntax-dynamic-import')
);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError('Invalid attempt to destructure non-iterable instance');
}

function _iterableToArrayLimit(arr, i) {
  if (
    !(
      Symbol.iterator in Object(arr) ||
      Object.prototype.toString.call(arr) === '[object Arguments]'
    )
  ) {
    return;
  }
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (
      var _i = arr[Symbol.iterator](), _s;
      !(_n = (_s = _i.next()).done);
      _n = true
    ) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

var asyncComponentImportNames = [];
var validImportSources = [
  '@jaredpalmer/after',
  '@jaredpalmer/after/asyncComponent',
];

function _default(_ref) {
  var t = _ref.types;
  return {
    name: 'after',
    inherits: _pluginSyntaxDynamicImport['default'],
    visitor: {
      ImportDeclaration: function ImportDeclaration(path) {
        if (
          t.isStringLiteral(path.node.source) &&
          validImportSources.includes(path.node.source.value)
        ) {
          var specifiers = path.node.specifiers;
          var asyncComponentImport = specifiers.filter(function(specifier) {
            return (
              t.isImportDefaultSpecifier(specifier) ||
              (t.isImportSpecifier(specifier) &&
                specifier.imported.name === 'asyncComponent')
            );
          });
          asyncComponentImport.forEach(function(asyncComponentImport) {
            asyncComponentImportNames.push(asyncComponentImport.local.name);
          });
        }
      },
      ObjectExpression: function ObjectExpression(path, _ref2) {
        var opts = _ref2.opts;
        // if there was no import statement just return
        if (asyncComponentImportNames.length === 0) return; // check for "component" in object properties and function call in value { component: hello() }

        var component = path.node.properties.find(function(property) {
          return (
            t.isIdentifier(property.key, {
              name: 'component',
            }) && t.isCallExpression(property.value)
          );
        }); // if there was not propery to match conditions just return

        if (!component) return;
        path.traverse(callVisitor, {
          parentPath: path,
          prefix: opts.prefix,
          t: t,
        });
      },
    },
  };
}

var callVisitor = {
  CallExpression: function CallExpression(path) {
    var t = this.t; // check if the function that get called is named "asyncComponent" or named export { asyncComponent as foo }

    if (
      t.isIdentifier(path.node.callee) &&
      asyncComponentImportNames.includes(path.node.callee.name)
    ) {
      path.traverse(importVisitor, {
        parentPath: path,
        prefix: this.prefix,
        t: t,
      });
    }
  },
};
var importVisitor = {
  Import: function Import(path) {
    var t = this.t;
    var argPath = (0, _helpers.getImportArgPath)(path);
    var node = argPath.node;
    var generatedChunkName = (0, _helpers.getMagicCommentChunkName)(node);
    var existingChunkName = (0, _helpers.existingMagicCommentChunkName)(node);
    var loaderArguments = this.parentPath.get('arguments')[0].get('properties');

    var _getAsyncComponentPar = (0, _helpers.getAsyncComponentParamter)(
        loaderArguments,
        'chunkName',
        t
      ),
      _getAsyncComponentPar2 = _slicedToArray(_getAsyncComponentPar, 2),
      chunkNameNodeIndex = _getAsyncComponentPar2[0],
      existingChunkNameFromParams = _getAsyncComponentPar2[1];

    var chunkName = convertChunkName(
      existingChunkNameFromParams || existingChunkName || generatedChunkName,
      this.prefix
    );
    (0, _helpers.addChunkNameToNode)(argPath, chunkName);
    var objectToAppend = t.objectProperty(
      t.identifier('chunkName'),
      generatedChunkName === '[request]' // if it was a dynamic route! import("./pages/${foo}")
        ? t.identifier(node.expressions[0].name) // add variable name as chunkName. chunkName: foo
        : t.stringLiteral(chunkName) // if it was static just add import() parameter
    );

    if (chunkNameNodeIndex !== -1) {
      loaderArguments[chunkNameNodeIndex].replaceWith(objectToAppend);
    } else {
      loaderArguments[0].insertAfter(objectToAppend);
    }
  },
};

function convertChunkName(chunkName) {
  var prefix =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  if (chunkName === '[request]') return chunkName; // we can't change request it's handled by webpack

  return prefix + chunkName.replace('/', '-');
}
