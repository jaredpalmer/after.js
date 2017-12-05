import React from 'react';

export function After(Component) {
  class AFTR extends React.Component {
    static async getInitialProps(ctx) {
      return Component.getInitialProps
        ? Component.getInitialProps(ctx)
        : Promise.resolve(undefined);
    }

    ignoreLast = false;

    componentDidMount() {
      if (!this.props.data) {
        this.reload({
          match: this.props.match,
          location: this.props.location,
          history: this.props.history,
        });
      }
    }

    componentWillUnmount() {
      this.ignoreLast = true;
    }

    reload = ctx => {
      if (!this.ignoreLast && this.constructor.getInitialProps) {
        this.constructor
          .getInitialProps(ctx)
          .then(
            data => this.props.updateData(data),
            error => this.setState({ error })
          );
      }
    };

    render() {
      return <Component {...this.state} {...this.props} reload={this.reload} />;
    }
  }
  return AFTR;
}
