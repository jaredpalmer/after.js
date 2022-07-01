/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest/presets/default-esm',
  globals: {
    'ts-jest': {
      useESM: true,
      diagnostics: false,
    },
  },
  testEnvironment: 'node',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  // transformIgnorePatterns: ['/node_modules/(?!(lodash-es)/)'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
