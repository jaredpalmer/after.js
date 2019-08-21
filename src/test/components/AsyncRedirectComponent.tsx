import React from 'react';
import { Redirect } from 'react-router-dom';

class AsyncRedirectComponent extends React.Component {
  static displayName = 'AsyncRedirectComponent';

  static async getInitialProps({ req, res, match, history, location, ...ctx }) {
    return await Promise.resolve({ redirectTo: '/new-location' });
  }

  render() {
    return <h1>i never get rendered !</h1>;
  }
}

export default AsyncRedirectComponent;
