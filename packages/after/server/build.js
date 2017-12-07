import { resolve, dirname, basename, isAbsolute, delimiter } from 'path';
import webpack from 'webpack';
import { transformFile } from 'babel-core';
import MemoryFS from 'memory-fs';
import presetEnv from 'babel-preset-env';
import presetReact from 'babel-preset-react';
import transformAsyncToGenerator from 'babel-plugin-transform-async-to-generator';
import transformClassProperties from 'babel-plugin-transform-class-properties';
import transformObjectRestSpread from 'babel-plugin-transform-object-rest-spread';
import transformRuntime from 'babel-plugin-transform-runtime';
import moduleAlias from 'babel-plugin-module-alias';
import paths from './paths';
import fs from 'fs';

const babelRuntimePath = require
  .resolve('babel-runtime/package')
  .replace(/[\\\/]package\.json$/, '');

export function transpile(path, { root = process.cwd() } = {}) {
  return new Promise((resolve, reject) => {
    transformFile(
      path,
      {
        presets: [presetEnv, presetReact],
        plugins: [
          transformAsyncToGenerator,
          transformClassProperties,
          transformObjectRestSpread,
          transformRuntime,
          [
            moduleAlias,
            [
              { src: `npm:${babelRuntimePath}`, expose: 'babel-runtime' },
              { src: `npm:${require.resolve('react')}`, expose: 'react' },
            ],
          ],
        ],
        ast: false,
      },
      (err, result) => {
        if (err) return reject(err);
        resolve(result.code);
      }
    );
  });
}
const appDirectory = fs.realpathSync(process.cwd());
const nodePath = (process.env.NODE_PATH || '')
  .split(delimiter)
  .filter(folder => folder && !isAbsolute(folder))
  .map(folder => resolve(appDirectory, folder))
  .join(delimiter);

export function bundleWeb(path, { root = process.cwd() } = {}) {
  const fs = new MemoryFS();

  const compiler = webpack({
    entry: path,
    output: {
      path: dirname(path),
      filename: basename(path),
      // libraryTarget: 'commonjs2',
    },

    resolve: {
      modules: ['node_modules', paths.appNodeModules].concat(
        // It is guaranteed to exist because we tweak it in `env.js`
        nodePath.split(path.delimiter).filter(Boolean)
      ),
      extensions: ['.js', '.json', '.jsx'],
    },
    resolveLoader: {
      modules: [paths.appNodeModules, paths.ownNodeModules],
    },
  });

  compiler.outputFileSystem = fs;

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) return reject(err);

      const jsonStats = stats.toJson();
      if (jsonStats.errors.length > 0) {
        const error = new Error(jsonStats.errors[0]);
        error.errors = jsonStats.errors;
        error.warnings = jsonStats.warnings;
        return reject(error);
      }

      resolve(fs.readFileSync(path));
    });
  });
}
