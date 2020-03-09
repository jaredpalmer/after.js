import React from 'react';
import { Route } from 'react-router-dom';

class NotFound extends React.Component {
  // just for test purpose
  static data = `The Page You Were Looking For Was Not Found`;

  render() {
    return (
      <Route
        render={({ staticContext }) => {
          if (staticContext) staticContext.statusCode = 404;
          return NotFound.data;
        }}
      />
    );
  }
}

export default NotFound;
