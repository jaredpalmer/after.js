'use strict';

const React = require('react');
/**
 * Returns a new React component, ready to be instantiated.
 * Note the closure here protecting Component, and providing a unique
 * instance of Component to the static implementation of `load`.
 */
module.exports = function generateAsyncRouteComponent({ loader, Placeholder }) {
  let Component = null;
  return class AsyncRouteComponent extends React.Component {
    /**
     * Static so that you can call load against an uninstantiated version of
     * this component. This should only be called one time outside of the
     * normal render path.
     */
    static load() {
      return loader().then(ResolvedComponent => {
        Component = ResolvedComponent.default || ResolvedComponent;
      });
    }

    static getInitialProps(ctx) {
      // Need to call the wrapped components getInitialProps if it exists
      if (Component !== null) {
        return Component.getInitialProps
          ? Component.getInitialProps(ctx)
          : Promise.resolve(null);
      }
    }

    constructor() {
      super();
      this.updateState = this.updateState.bind(this);
      this.state = {
        Component,
      };
    }

    componentWillMount() {
      if (this.state.Component === null) {
        AsyncRouteComponent.load().then(this.updateState);
      }
    }

    updateState() {
      // Only update state if we don't already have a reference to the
      // component, this prevent unnecessary renders.
      if (this.state.Component !== Component) {
        this.setState({
          Component,
        });
      }
    }

    render() {
      const { Component: ComponentFromState } = this.state;
      if (ComponentFromState) {
        return React.createElement(ComponentFromState, this.props);
      }

      if (Placeholder) {
        return React.createElement(Placeholder, this.props);
      }

      return null;
    }
  };
};
