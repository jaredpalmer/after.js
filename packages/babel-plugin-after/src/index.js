import syntaxDynamicImport from '@babel/plugin-syntax-dynamic-import';
import {
  existingMagicCommentChunkName,
  getMagicCommentChunkName,
  getImportArgPath,
  addChunkNameToNode,
  getAsyncComponentParamter,
} from './helpers';

let asyncComponentImportNames = [];

const validImportSources = [
  '@jaredpalmer/after',
  '@jaredpalmer/after/asyncComponent',
];

export default function({ types: t }) {
  return {
    name: 'after',
    inherits: syntaxDynamicImport,
    visitor: {
      ImportDeclaration(path) {
        if (
          t.isStringLiteral(path.node.source) &&
          validImportSources.includes(path.node.source.value)
        ) {
          const { specifiers } = path.node;
          const asyncComponentImport = specifiers.filter(
            specifier =>
              t.isImportDefaultSpecifier(specifier) ||
              (t.isImportSpecifier(specifier) &&
                specifier.imported.name === 'asyncComponent')
          );
          asyncComponentImport.forEach(asyncComponentImport => {
            asyncComponentImportNames.push(asyncComponentImport.local.name);
          });
        }
      },
      ObjectExpression(path, { opts }) {
        // if there was no import statement just return
        if (asyncComponentImportNames.length === 0) return;

        // check for "component" in object properties and function call in value { component: hello() }
        const component = path.node.properties.find(
          property =>
            t.isIdentifier(property.key, { name: 'component' }) &&
            t.isCallExpression(property.value)
        );

        // if there was not propery to match conditions just return
        if (!component) return;

        path.traverse(callVisitor, {
          parentPath: path,
          prefix: opts.prefix,
          t,
        });
      },
    },
  };
}

const callVisitor = {
  CallExpression(path) {
    const t = this.t;

    // check if the function that get called is named "asyncComponent" or named export { asyncComponent as foo }
    if (
      t.isIdentifier(path.node.callee) &&
      asyncComponentImportNames.includes(path.node.callee.name)
    ) {
      path.traverse(importVisitor, {
        parentPath: path,
        prefix: this.prefix,
        t,
      });
    }
  },
};

const importVisitor = {
  Import(path) {
    const t = this.t;
    const argPath = getImportArgPath(path);
    const { node } = argPath;
    const generatedChunkName = getMagicCommentChunkName(node);
    const existingChunkName = existingMagicCommentChunkName(node);

    const loaderArguments = this.parentPath
      .get('arguments')[0]
      .get('properties');

    const [
      chunkNameNodeIndex,
      existingChunkNameFromParams,
    ] = getAsyncComponentParamter(loaderArguments, 'chunkName', t);

    const chunkName = convertChunkName(
      existingChunkNameFromParams || existingChunkName || generatedChunkName,
      this.prefix
    );

    addChunkNameToNode(argPath, chunkName);

    const objectToAppend = t.objectProperty(
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

function convertChunkName(chunkName, prefix = '') {
  if (chunkName === '[request]') return chunkName; // we can't change request it's handled by webpack
  return prefix + chunkName.replace('/', '-');
}
