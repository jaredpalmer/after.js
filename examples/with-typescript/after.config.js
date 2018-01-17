'use strict';

module.exports = {
  modify(baseConfig, { target, dev }, webpack) {
    const config = Object.assign({}, baseConfig);

    config.resolve.extensions = config.resolve.extensions.concat([
      '.ts',
      '.tsx',
    ]);

    config.devtool = 'cheap-module-source-map';

    // Locate eslint-loader and remove it (we're using tslint instead)
    config.module.rules = config.module.rules.filter(
      rule =>
        !(
          Array.isArray(rule.use) &&
          rule.use.length > 0 &&
          rule.use[0].options &&
          'useEslintrc' in rule.use[0].options
        )
    );

    // Safely locate Babel-Loader in Razzle's webpack internals
    const babelLoader = config.module.rules.findIndex(
      rule => rule.options && rule.options.babelrc
    );

    // Get the correct `include` option, since that hasn't changed.
    // This tells Razzle which directories to transform.
    const { include } = config.module.rules[babelLoader];

    // Declare our TypeScript loader configuration
    const tsLoader = {
      include,
      test: /\.tsx?$/,
      loader: 'ts-loader',
    };

    const tslintLoader = {
      include,
      enforce: 'pre',
      test: /\.tsx?$/,
      loader: 'tslint-loader',
      options: {
        emitErrors: true,
        configFile: './tslint.json',
      },
    };

    config.module.rules.push(tslintLoader);
    config.module.rules.push(tsLoader);

    return config;
  },
};
