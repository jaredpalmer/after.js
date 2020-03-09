import { Chunks } from '../types';
// sample chunks array for test

const chunks: Chunks = {
  'components-Home': {
    css: ['static/css/components-AsyncGetInitialProps.hash.css'],
    js: ['static/js/components-AsyncGetInitialProps.hash.js'],
  },
  'components-AsyncGetInitialProps': {
    css: [],
    js: ['static/js/components-AsyncGetInitialProps.hash.js'],
  },
  'components-NoNDefaultExport': {
    css: ['static/css/components-NoNDefaultExport.hash.css'],
    js: ['static/js/components-NoNDefaultExport.hash.js'],
  },
  client: {
    css: ['static/css/bundle.hash.css'],
    js: ['static/js/client.hash.js'],
  },
};

export default chunks;
