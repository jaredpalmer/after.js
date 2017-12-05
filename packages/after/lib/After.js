import React from 'react';

export function After(Component) {
  class AFTR extends React.Component {
    static async getInitialProps(ctx) {
      return Component.getInitialProps
        ? Component.getInitialProps(ctx)
        : Promise.resolve(undefined);
    }

    constructor(props) {
      super(props);
      this.state = {
        data: props.data,
        isLoading: false,
      };
      this.ignoreLast = false;
    }

    // Invoked when a component is receiving new props.
    // Not called for the initial render
    componentWillReceiveProps(nextProps, nextState) {
      if (this.props.location.pathame !== nextProps.location.pathame) {
        this.reload(nextProps);
      }
    }

    componentDidMount() {
      if (!this.state.data) {
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
        this.setState({ isLoading: true, data: undefined });
        this.constructor
          .getInitialProps(ctx)
          .then(
            data => this.props.updateData(data),
            error => this.setState({ error, isLoading: false })
          );
      }
    };

    render() {
      return <Component {...this.state} {...this.props} />;
    }
  }
  return AFTR;
}
