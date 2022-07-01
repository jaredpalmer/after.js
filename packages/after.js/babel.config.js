module.exports = (api) => {
  api.cache(() => process.env.NODE_ENV);
  return {
    presets: [
      [
        require('@babel/preset-env'),
        {
          // get targets from root .browserslistrc file
          useBuiltIns: false,
          modules: false,
        },
      ],
      [require('@babel/preset-react'), { runtime: 'automatic' }],
      require('@babel/preset-typescript'),
    ],
    plugins: [
      [
        require('@babel/plugin-transform-runtime'),
        {
          absoluteRuntime: false,
          corejs: false,
          helpers: true,
          regenerator: true,
          useESModules: false,
          //require latest version available to avoid regenerator commonjs import
          version: require('@babel/runtime/package.json').version,
        },
      ],
    ],
    env: {
      cjs: {
        presets: [
          [
            require('@babel/preset-env'),
            {
              targets: {
                node: 'current',
              },
              useBuiltIns: false,
              modules: 'commonjs',
            },
          ],
        ],
      },
      test: {
        presets: [
          [require('@babel/preset-react'), { runtime: 'automatic' }],
          [require('@babel/preset-env'), { targets: { node: 'current' } }],
          require('@babel/preset-typescript'),
        ],
        plugins: [],
      },
    },
  };
};
