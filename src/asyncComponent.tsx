import * as React from 'react';
import { Module, AsyncRouteComponentState, AsyncRouteComponentType, Ctx } from './types';

/**
 * Returns a new React component, ready to be instantiated.
 * Note the closure here protecting Component, and providing a unique
 * instance of Component to the static implementation of `load`.
 */
export function asyncComponent<Props>({
  loader,
  Placeholder
}: {
  loader: () => Promise<Module<React.ComponentType<Props>>>;
  Placeholder?: React.ComponentType<Props>;
}) {
  // keep Component in a closure to avoid doing this stuff more than once
  let Component: AsyncRouteComponentType<Props> | null = null;

  return class AsyncRouteComponent extends React.Component<Props, AsyncRouteComponentState> {
    /**
     * Static so that you can call load against an uninstantiated version of
     * this component. This should only be called one time outside of the
     * normal render path.
     */
    static load() {
      return loader().then((ResolvedComponent) => {
        Component = ResolvedComponent!.default || ResolvedComponent;
      });
    }

    static getInitialProps(ctx: Ctx<any>) {
      // Need to call the wrapped components getInitialProps if it exists
      if (Component !== null) {
        return Component.getInitialProps ? Component.getInitialProps(ctx) : Promise.resolve(null);
      }
    }

    constructor(props: Props) {
      super(props);
      this.updateState = this.updateState.bind(this);
      this.state = {
        Component
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
          Component
        });
      }
    }

    render() {
      const { Component: ComponentFromState } = this.state;

      if (ComponentFromState) {
        // @ts-ignore
        return <ComponentFromState {...this.props} />;
      }

      if (Placeholder) {
        return <Placeholder {...this.props} />;
      }

      return null;
    }
  };
}
