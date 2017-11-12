import React from 'react';
import { Switch, Route } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <Switch>
        {this.props.routes.map((r, i) => <Route key={`route--${i}`} {...r} />)}
      </Switch>
    );
  }
}

export default App;
