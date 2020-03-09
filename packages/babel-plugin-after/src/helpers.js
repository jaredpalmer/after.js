// these helper methods re-exported from faceyspacey/babel-plugin-universal-import
// https://github.com/faceyspacey/babel-plugin-universal-import/blob/master/index.js

export const validMagicStrings = [
  'webpackMode',
  // 'webpackMagicChunkName' gets dealt with current implementation & naming/renaming strategy
  'webpackInclude',
  'webpackExclude',
  'webpackIgnore',
  'webpackPreload',
  'webpackPrefetch',
];

export function getImportArgPath(p) {
  return p.parentPath.get('arguments')[0];
}

export function existingMagicCommentChunkName(importArgNode) {
  const { leadingComments } = importArgNode;
  if (
    leadingComments &&
    leadingComments.length &&
    leadingComments[0].value.indexOf('webpackChunkName') !== -1
  ) {
    try {
      return leadingComments[0].value
        .split('webpackChunkName:')[1]
        .replace(/["']/g, '')
        .trim();
    } catch (e) {
      return null;
    }
  }
  return null;
}

export function trimChunkNameBaseDir(baseDir) {
  return baseDir.replace(/^[./]+|(\.js$)/g, '');
}

export function getMagicCommentChunkName(importArgNode) {
  const { quasis, expressions } = importArgNode;
  if (!quasis) return trimChunkNameBaseDir(importArgNode.value);

  const baseDir = quasis[0].value.cooked;
  const hasExpressions = expressions.length > 0;
  const chunkName = hasExpressions
    ? '[request]'
    : trimChunkNameBaseDir(baseDir);
  return chunkName;
}

export function getMagicWebpackComments(importArgNode) {
  const { leadingComments } = importArgNode;
  const results = [];
  if (leadingComments && leadingComments.length) {
    leadingComments.forEach(comment => {
      try {
        const validMagicString = validMagicStrings.filter(str =>
          new RegExp(`${str}\\w*:`).test(comment.value)
        );
        // keep this comment if we found a match
        if (validMagicString && validMagicString.length === 1) {
          results.push(comment);
        }
      } catch (e) {
        // eat the error, but don't give up
      }
    });
  }
  return results;
}

export function addChunkNameToNode(argPath, chunkName) {
  const otherValidMagicComments = getMagicWebpackComments(argPath.node);

  delete argPath.node.leadingComments;
  argPath.addComment('leading', ` webpackChunkName: '${chunkName}' `);
  otherValidMagicComments.forEach(validLeadingComment =>
    argPath.addComment('leading', validLeadingComment.value)
  );
}

export function getAsyncComponentParamter(loaderArguments, name, t) {
  const index = loaderArguments.findIndex(property =>
    t.isIdentifier(property.node.key, { name })
  );
  return [index, index === -1 ? null : loaderArguments[index].node.value.value];
}
