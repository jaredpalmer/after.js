#! /usr/bin/env node
'use strict';

process.env.NODE_ENV = 'development';
const fs = require('fs-extra');
const webpack = require('webpack');
const paths = require('../config/paths');
const path = require('path');
const createConfig = require('../config/createConfig');
const devServer = require('webpack-dev-server');
const printErrors = require('razzle-dev-utils/printErrors');
const clearConsole = require('react-dev-utils/clearConsole');
const logger = require('razzle-dev-utils/logger');
const chokidar = require('chokidar');
const { choosePort } = require('react-dev-utils/WebpackDevServerUtils');

process.noDeprecation = true; // turns off that loadQuery clutter.

if (process.argv.includes('--inspect-brk')) {
  process.env.INSPECT_BRK_ENABLED = true;
} else if (process.argv.includes('--inspect')) {
  process.env.INSPECT_ENABLED = true;
}

// Optimistically, we make the console look exactly like the output of our
// FriendlyErrorsPlugin during compilation, so the user has immediate feedback.
// clearConsole();
logger.start('Compiling...');
let after = {};

// Check for after.config.js file
if (fs.existsSync(paths.appAfterConfig)) {
  try {
    after = require(paths.appAfterConfig);
  } catch (e) {
    clearConsole();
    logger.error('Invalid after.config.js file.', e);
    process.exit(1);
  }
}

// Delete assets.json to always have a manifest up to date
fs.removeSync(paths.appManifest);

// Create dev configs using our config factory, passing in after file as
// options.
let clientConfig = createConfig('web', 'dev', after);
let serverConfig = createConfig('node', 'dev', after);

// Check if after.config has a modify function. If it does, call it on the
// configs we just created.
if (after.modify) {
  clientConfig = after.modify(
    clientConfig,
    { target: 'web', dev: true },
    webpack
  );
  serverConfig = after.modify(
    serverConfig,
    { target: 'node', dev: true },
    webpack
  );
}

async function start() {
  await fs.copy(path.join(__dirname, '../lib'), paths.appTemp + '/src', {
    overwrite: true,
  });

  try {
    await fs.copy('src', paths.appTemp + '/src', { overwrite: true });
  } catch (error) {
    console.log('Please create a src directory in the root of your project');
    process.exit(1);
  }

  try {
    await fs.copy('public', paths.appTemp + '/public', { overwrite: true });
  } catch (e) {}

  const tempSrc = paths.appTemp + '/src';

  const serverCompiler = compile(serverConfig);

  // Start our server webpack instance in watch mode.
  serverCompiler.watch(
    {
      quiet: true,
      stats: 'none',
    },
    /* eslint-disable no-unused-vars */
    stats => {}
  );

  // Compile our assets with webpack
  const clientCompiler = compile(clientConfig);

  // Create a new instance of Webpack-dev-server for our client assets.
  // This will actually run on a different port than the users app.
  const clientDevServer = new devServer(clientCompiler, clientConfig.devServer);

  // Start Webpack-dev-server
  clientDevServer.listen(
    (process.env.PORT && parseInt(process.env.PORT) + 1) || after.port || 3001,
    err => {
      if (err) {
        logger.error(err);
      }
    }
  );

  chokidar
    .watch('src', { ignored: /(^|[\/\\])\../ })
    .on('change', changedPath => {
      fs.copyFile(changedPath, tempSrc.replace('src', changedPath), err => {
        if (err) {
          console.log(err);
        }
      });
    });
}

// Webpack compile in a try-catch
function compile(config) {
  let compiler;
  try {
    compiler = webpack(config);
  } catch (e) {
    printErrors('Failed to compile.', [e]);
    process.exit(1);
  }
  return compiler;
}

// Checks if PORT and PORT_DEV are available and suggests alternatives if not
async function setPorts() {
  const port = await choosePort(process.env.HOST, process.env.PORT || 3000);
  const portDev = await choosePort(
    process.env.HOST,
    process.env.PORT_DEV || 3001
  );
  process.env.PORT = port;
  process.env.PORT_DEV = portDev;
}

setPorts()
  .then(start)
  .catch(console.error);
