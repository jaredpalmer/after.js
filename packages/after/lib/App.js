import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { After } from './After';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
  }

  // only runs clizzient
  componentWillReceiveProps(nextProps, nextState) {
    this.setState({ data: undefined });
  }

  updateData = data => {
    this.setState({ data });
  };

  render() {
    const { data } = this.state;
    return (
      <Switch>
        {this.props.routes.map((r, i) => (
          <Route
            key={`route--${i}`}
            path={r.path}
            exact={r.exact}
            render={props => {
              return React.createElement(After(r.component), {
                data,
                updateData: this.updateData,
                ...props,
              });
            }}
          />
        ))}
      </Switch>
    );
  }
}

export default withRouter(App);
