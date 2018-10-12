module.exports = {
  modify: (config, { target, dev }, webpack) => {
    if (target === 'web') {
      // only ignore when the config is for client compilation
      config.plugins.push(new webpack.IgnorePlugin(/server\//));
    }

    return config;
  },
};
