import * as React from 'react';

export interface AsyncRouteComponentProps {
  isInitialRender: boolean;
  setAppState: (data: any) => void;
}

export interface AsyncRouteComponentState {
  Component: React.ReactNode | null;
}
/**
 * Returns a new React component, ready to be instantiated.
 * Note the closure here protecting Component, and providing a unique
 * instance of Component to the static implementation of `load`.
 */
export function asyncComponent<Props = any>({
  loader,
  Placeholder,
}: {
  loader: () => Promise<any>;
  Placeholder?: React.ComponentType<Props>;
}) {
  let Component: any = null; // keep Component in a closure to avoid doing this stuff more than once
  return class AsyncRouteComponent extends React.Component<
    // AsyncRouteComponentProps,
    any,
    AsyncRouteComponentState
  > {
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

    static getInitialProps(ctx: any) {
      // Need to call the wrapped components getInitialProps if it exists
      if (Component !== null) {
        return Component.getInitialProps
          ? Component.getInitialProps(ctx)
          : Promise.resolve(null);
      }
    }

    constructor(props: any) {
      super(props);
      this.updateState = this.updateState.bind(this);
      this.state = {
        Component,
      };
    }

    componentWillMount() {
      AsyncRouteComponent.load().then(this.updateState);
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
      const { Component: ComponentFromState } = this.state as any;
      if (ComponentFromState) {
        return <ComponentFromState {...this.props} />;
      }

      if (Placeholder) {
        return <Placeholder {...this.props} />;
      }

      return null;
    }
  };
}
