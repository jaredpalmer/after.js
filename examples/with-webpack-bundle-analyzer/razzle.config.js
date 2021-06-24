const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    modifyWebpackConfig(opts) {
        const config = opts.webpackConfig;
        if(opts.env.dev){
            config.plugins.push(new BundleAnalyzerPlugin({analyzerPort: opts.env.target === 'web' ? 8888: 8889}));
        }
    
        return config;
      },
  };