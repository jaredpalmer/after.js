module.exports = {
  rollup(config, opts) {
    if (opts.format === 'esm') {
      const defaultExternals = config.external;
      config = {
        ...config,
        external: id => {
          // this condition copied from: https://github.com/formium/tsdx/blob/462af2d002987f985695b98400e0344b8f2754b7/src/createRollupConfig.ts#L65-L67
          // and the return statement changed from false to true
          // if we set this to false, esm build tree-shaking will not work
          if (id.startsWith('regenerator-runtime')) {
            return true;
          }

          return defaultExternals(id);
        },
        preserveModules: true,
      };
      config.output = {
        ...config.output,
        dir: 'dist/esm',
        entryFileNames: '[name].esm.js',
      };
      delete config.output.file;
    }
    return config;
  },
};
