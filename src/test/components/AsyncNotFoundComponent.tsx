import React from 'react';

class AsyncNotFoundComponent extends React.Component {
  static displayName = 'AsyncNotFoundComponent';

  static async getInitialProps({ req, res, match, history, location, ...ctx }) {
    return await Promise.resolve({ statusCode: 404 });
  }

  render() {
    return <h1>Page Not Found</h1>;
  }
}

export default AsyncNotFoundComponent;
