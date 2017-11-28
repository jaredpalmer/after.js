import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { After } from './After';

class App extends React.Component {
  render() {
    return (
      <Switch>
        {this.props.routes.map((r, i) => (
          <Route
            key={`route--${i}`}
            render={props => {
              const el = After(r.component);
              return React.createElement(el, {
                data: this.props.data,
                error: this.props.error,
                ...props,
              });
            }}
          />
        ))}
      </Switch>
    );
  }
}

export default App;
