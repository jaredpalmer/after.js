import React from 'react';
import { Route } from 'react-router-dom';

class UserDefined404Component extends React.Component {
  static displayName = 'UserDefined404Component';
  static data = `UserDefined404Component rendred !`;

  render() {
    return (
      <Route
        render={({ staticContext }) => {
          if (staticContext) staticContext.statusCode = 404;
          return <h3>{UserDefined404Component.data}</h3>;
        }}
      />
    );
  }
}

export default UserDefined404Component;
