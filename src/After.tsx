import * as React from 'react';
import { Switch, Route, withRouter, match as Match } from 'react-router-dom';
import { loadInitialProps } from './loadInitialProps';
import { History, Location } from 'history';
import { AsyncRouteProps } from './types';

export interface AfterpartyProps {
  delayRouteTransitions: Boolean,
  history: History;
  location: Location;
  data?: Promise<any>[];
  routes: AsyncRouteProps[];
  match: Match<any>;
}

export interface AfterpartyState {
  data?: Promise<any>[];
  previousLocation: Location | null;
}

class Afterparty extends React.Component<AfterpartyProps, AfterpartyState> {
  prefetcherCache: any;

  constructor(props: AfterpartyProps) {
    super(props);

    this.state = {
      data: props.data,
      previousLocation: null
    };

    this.prefetcherCache = {};
  }

  beforeLoadingInitialProps() {
    const { delayRouteTransitions } = this.props;

    if (delayRouteTransitions) {
      this.setState({
        previousLocation: this.props.location,
      });
    } else {
      window.scrollTo(0, 0);

      this.setState({
        previousLocation: this.props.location,
        data: undefined,
      });
    }

    return Promise.resolve()
  }

  afterLoadingInitialProps(data: any) {
    const { delayRouteTransitions } = this.props;

    if (delayRouteTransitions) {
      window.scrollTo(0, 0);
    }

    this.setState({ previousLocation: null, data: data });
  }

  // only runs clizzient
  componentDidUpdate(prevProps: AfterpartyProps) {
    const navigated = prevProps.location !== this.props.location;
    if (navigated) {
      const { data, match, routes, history, location, delayRouteTransitions, children, ...rest } = this.props;

      this.beforeLoadingInitialProps()
        .then(
          () => loadInitialProps(routes, location.pathname, {
            location,
            history,
            ...rest,
          })
        ).then(({ data }) => this.afterLoadingInitialProps(data))
        .catch(e => {
          // @todo we should more cleverly handle errors???
          console.log(e);
        });
    }
  }

  prefetch = (pathname: string) => {
    loadInitialProps(this.props.routes, pathname, {
      history: this.props.history
    })
      .then(({ data }) => {
        this.prefetcherCache = {
          ...this.prefetcherCache,
          [pathname]: data
        };
      })
      .catch((e) => console.log(e));
  }

  render() {
    const { previousLocation, data } = this.state;
    const { location, delayRouteTransitions } = this.props;
    const initialData = this.prefetcherCache[location.pathname] || data;
    const currentLocation = previousLocation || location;

    return (
      <Switch location={delayRouteTransitions ? currentLocation : undefined}>
        {this.props.routes.map((r, i) => (
          <Route
            key={`route--${i}`}
            path={r.path}
            exact={r.exact}
            location={delayRouteTransitions ? undefined : currentLocation}
            render={props =>
              React.createElement(r.component, {
                ...initialData,
                history: props.history,
                location: currentLocation,
                match: props.match,
                prefetch: this.prefetch
              })
            }
          />
        ))}
      </Switch>
    );
  }
}

export const After = (withRouter as any)(Afterparty);
