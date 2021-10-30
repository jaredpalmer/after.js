import React from 'react';

class AsyncNotFoundComponent extends React.Component {
  static displayName = 'AsyncNotFoundComponent';
  static data = 'The Page You Were Looking For Was Not Found';

  static async getInitialProps() {
    return await Promise.resolve({ statusCode: 404 });
  }

  render() {
    return <h1>{AsyncNotFoundComponent.data}</h1>;
  }
}

export default AsyncNotFoundComponent;
