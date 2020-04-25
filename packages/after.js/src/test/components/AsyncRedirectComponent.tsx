import React from 'react';

class AsyncRedirectComponent extends React.Component {
  static displayName = 'AsyncRedirectComponent';

  static async getInitialProps() {
    return await Promise.resolve({ redirectTo: '/new-location' });
  }

  render() {
    return <h1>i never get rendered !</h1>;
  }
}

export default AsyncRedirectComponent;
