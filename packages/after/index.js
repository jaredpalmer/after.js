'use strict';

const chokidar = require('chokidar');
const fs = require('fs-extra');
const path = require('path');

module.exports = {
  preCompile() {
    fs.copySync(path.join(__dirname, './lib'), path.resolve('./build/src'), {
      overwrite: true,
    });
    fs.copySync(path.resolve('./src'), path.resolve('./build/src'), {
      overwrite: true,
    });
    fs.copySync(path.resolve('./public'), path.resolve('./build/public'), {
      overwrite: true,
    });
  },
  modifyPaths(env, oldpaths) {
    return Object.assign({}, oldpaths, {
      appBuild: path.resolve('./build/build'),
      appBuildPublic: path.resolve('./build/build/public'),
      appManifest: path.resolve('./build/build/assets.json'),
      appClientIndexJs: path.resolve('./build/src/client'),
      appServerIndexJs: path.resolve('./build/src/index'),
      appSrc: env === 'test' ? oldpaths.appSrc : path.resolve('./build/src'),
    });
  },
  postCompile(env) {
    if (env === 'dev') {
      chokidar
        .watch('src', { ignored: /(^|[\/\\])\../ })
        .on('change', changedPath => {
          fs.copyFile(
            changedPath,
            path.resolve('./build/src').replace('src', changedPath),
            err => {
              if (err) {
                console.log(err);
              }
            }
          );
        });
    }
  },
};
