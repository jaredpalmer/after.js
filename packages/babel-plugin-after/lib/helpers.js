"use strict"

Object.defineProperty(exports, "__esModule", {
  value: true,
})
exports.getImportArgPath = getImportArgPath
exports.existingMagicCommentChunkName = existingMagicCommentChunkName
exports.trimChunkNameBaseDir = trimChunkNameBaseDir
exports.getMagicCommentChunkName = getMagicCommentChunkName
exports.getMagicWebpackComments = getMagicWebpackComments
exports.addChunkNameToNode = addChunkNameToNode
exports.getAsyncComponentParamter = getAsyncComponentParamter
exports.validMagicStrings = void 0
// these helper methods re-exported from faceyspacey/babel-plugin-universal-import
// https://github.com/faceyspacey/babel-plugin-universal-import/blob/master/index.js
var validMagicStrings = [
  "webpackMode", // 'webpackMagicChunkName' gets dealt with current implementation & naming/renaming strategy
  "webpackInclude",
  "webpackExclude",
  "webpackIgnore",
  "webpackPreload",
  "webpackPrefetch",
]
exports.validMagicStrings = validMagicStrings

function getImportArgPath(p) {
  return p.parentPath.get("arguments")[0]
}

function existingMagicCommentChunkName(importArgNode) {
  var leadingComments = importArgNode.leadingComments

  if (
    leadingComments &&
    leadingComments.length &&
    leadingComments[0].value.indexOf("webpackChunkName") !== -1
  ) {
    try {
      return leadingComments[0].value
        .split("webpackChunkName:")[1]
        .replace(/["']/g, "")
        .trim()
    } catch (e) {
      return null
    }
  }

  return null
}

function trimChunkNameBaseDir(baseDir) {
  return baseDir.replace(/^[./]+|(\.js$)/g, "")
}

function getMagicCommentChunkName(importArgNode) {
  var quasis = importArgNode.quasis,
    expressions = importArgNode.expressions
  if (!quasis) return trimChunkNameBaseDir(importArgNode.value)
  var baseDir = quasis[0].value.cooked
  var hasExpressions = expressions.length > 0
  var chunkName = hasExpressions ? "[request]" : trimChunkNameBaseDir(baseDir)
  return chunkName
}

function getMagicWebpackComments(importArgNode) {
  var leadingComments = importArgNode.leadingComments
  var results = []

  if (leadingComments && leadingComments.length) {
    leadingComments.forEach(function(comment) {
      try {
        var validMagicString = validMagicStrings.filter(function(str) {
          return new RegExp("".concat(str, "\\w*:")).test(comment.value)
        }) // keep this comment if we found a match

        if (validMagicString && validMagicString.length === 1) {
          results.push(comment)
        }
      } catch (e) {
        // eat the error, but don't give up
      }
    })
  }

  return results
}

function addChunkNameToNode(argPath, chunkName) {
  var otherValidMagicComments = getMagicWebpackComments(argPath.node)
  delete argPath.node.leadingComments
  argPath.addComment("leading", " webpackChunkName: '".concat(chunkName, "' "))
  otherValidMagicComments.forEach(function(validLeadingComment) {
    return argPath.addComment("leading", validLeadingComment.value)
  })
}

function getAsyncComponentParamter(loaderArguments, name, t) {
  var index = loaderArguments.findIndex(function(property) {
    return t.isIdentifier(property.node.key, {
      name: name,
    })
  })
  return [index, index === -1 ? null : loaderArguments[index].node.value.value]
}
