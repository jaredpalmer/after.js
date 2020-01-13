import React from 'react';

class NonDymamicImport extends React.Component {
  static displayName = 'NonDynamicExport';

  static async getInitialProps({ req, res, match, history, location, ...ctx }) {
    return { stuff: 'non dynamic export' };
  }

  render() {
    return <h1>Non Dynamic Import</h1>;
  }
}

export default NonDymamicImport;
