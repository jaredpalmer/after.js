import React from 'react';

export class NonDefaultExport extends React.Component {
  static displayName = 'NonDefaultExport';

  static async getInitialProps({ req, res, match, history, location, ...ctx }) {
    return { stuff: 'non default export' };
  }

  render() {
    return <h1>Non Default Export</h1>;
  }
}
