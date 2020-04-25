import * as React from 'react';
import {
  Switch,
  Route,
  withRouter,
  Redirect,
  match as Match,
  RouteComponentProps,
} from 'react-router-dom';
import { loadInitialProps } from './loadInitialProps';
import { History, Location } from 'history';
import { AsyncRouteProps, ServerAppState, InitialData } from './types';
import { get404Component, getAllRoutes } from './utils';

export interface AfterpartyProps extends RouteComponentProps<any> {
  history: History;
  location: Location;
  data: ServerAppState;
  routes: AsyncRouteProps[];
  match: Match<any>;
}

export interface AfterpartyState {
  data?: InitialData;
  previousLocation: Location | null;
  currentLocation: Location | null;
}

class Afterparty extends React.Component<AfterpartyProps, AfterpartyState> {
  prefetcherCache: any;
  NotfoundComponent:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;

  constructor(props: AfterpartyProps) {
    super(props);

    this.state = {
      data: props.data.initialData,
      previousLocation: null,
      currentLocation: props.location,
    };

    this.prefetcherCache = {};
    this.NotfoundComponent = get404Component(props.routes);
  }

  static getDerivedStateFromProps(
    props: AfterpartyProps,
    state: AfterpartyState
  ) {
    const currentLocation = props.location;
    const previousLocation = state.currentLocation;

    const navigated = currentLocation !== previousLocation;
    if (navigated) {
      return {
        previousLocation: state.previousLocation || previousLocation,
        currentLocation,
      };
    }

    return null;
  }

  componentDidUpdate(_prevProps: AfterpartyProps, prevState: AfterpartyState) {
    const navigated = prevState.currentLocation !== this.state.currentLocation;
    if (navigated) {
      const { location, history, routes, data, ...rest } = this.props;

      const { scrollToTop } = data.afterData;

      loadInitialProps(routes, location.pathname, {
        location: location,
        history: history,
        scrollToTop,
        ...rest,
      })
        .then(({ data }) => {
          if (this.state.currentLocation !== location) return;

          // Only for page changes, prevent scroll up for anchor links
          if (
            (prevState.previousLocation &&
              prevState.previousLocation.pathname) !== location.pathname &&
            // Only Scroll if scrollToTop is not false
            this.props.data.afterData.scrollToTop.current
          ) {
            window.scrollTo(0, 0);
          }
          this.setState({ previousLocation: null, data });
        })
        .catch(e => {
          // @todo we should more cleverly handle errors???
          console.log(e);
        });
    }
  }

  prefetch = (pathname: string) => {
    loadInitialProps(this.props.routes, pathname, {
      history: this.props.history,
    })
      .then(({ data }) => {
        this.prefetcherCache = {
          ...this.prefetcherCache,
          [pathname]: data,
        };
      })
      .catch(e => console.log(e));
  };

  render() {
    const { previousLocation, data } = this.state;
    const { location: currentLocation } = this.props;
    const initialData = this.prefetcherCache[currentLocation.pathname] || data;

    const location = previousLocation || currentLocation;

    return (
      <Switch location={location}>
        {initialData &&
          initialData.statusCode &&
          initialData.statusCode === 404 && (
            <Route
              component={this.NotfoundComponent}
              path={location.pathname}
            />
          )}
        {initialData && initialData.redirectTo && initialData.redirectTo && (
          <Redirect to={initialData.redirectTo} />
        )}
        {getAllRoutes(this.props.routes).map((r, i) => (
          <Route
            key={`route--${i}`}
            path={r.path}
            exact={r.exact}
            render={props =>
              React.createElement(r.component, {
                ...initialData,
                history: props.history,
                match: props.match,
                prefetch: this.prefetch,
                location,
              })
            }
          />
        ))}
      </Switch>
    );
  }
}
export const After = withRouter(Afterparty);
