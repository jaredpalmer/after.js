import React from 'react';
import { Redirect } from 'react-router-dom';

class NonAsyncRedirectComponent extends React.Component {
  static displayName = 'NonAsyncRedirectComponent';

  static data = `NonAsyncRedirectComponent rendred !`;

  render() {
    return (
      <>
        <h3>{NonAsyncRedirectComponent.data}</h3>
        <Redirect to="/new-location" />
      </>
    );
  }
}

export default NonAsyncRedirectComponent;
