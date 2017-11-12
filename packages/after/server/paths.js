'use strict';

var path = require('path');
var fs = require('fs');

var nodePaths = (process.env.NODE_PATH || '')
  .split(process.platform === 'win32' ? ';' : ':')
  .filter(Boolean)
  .filter(function(folder) {
    return !path.isAbsolute(folder);
  })
  .map(resolveApp);

function resolveApp(relativePath) {
  return path.resolve(fs.realpathSync(process.cwd()), relativePath);
}

function resolveOwn(relativePath) {
  return path.resolve(__dirname, '..', relativePath);
}

module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appBuild: resolveApp('build'),
  appBuildPublic: resolveApp('build/public'),
  appManifest: resolveApp('build/assets.json'),
  appPublic: resolveApp('public'),
  appNodeModules: resolveApp('node_modules'),
  appSrc: resolveApp('src'),
  appPackageJson: resolveApp('package.json'),
  appServerIndexJs: resolveApp('src'),
  appClientIndexJs: resolveApp('src/client'),
  testsSetup: resolveApp('src/setupTests.js'),
  appBabelRc: resolveApp('.babelrc'),
  appEslintRc: resolveApp('.eslintrc'),
  appRazzleConfig: resolveApp('razzle.config.js'),
  nodePaths: nodePaths,
  ownPath: resolveOwn('.'),
  ownNodeModules: resolveOwn('node_modules'),
};
