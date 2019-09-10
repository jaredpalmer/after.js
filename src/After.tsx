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
import { AsyncRouteProps } from './types';
import { get404Component, getAllRoutes, isDOM } from './utils';

export interface AfterpartyProps extends RouteComponentProps<any> {
  history: History;
  location: Location;
  data?: Promise<any>[];
  routes: AsyncRouteProps[];
  match: Match<any>;
}

export interface AfterpartyState {
  data?: Promise<any>[];
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

    let SERVER_APP_STATE = props.data;
    if (isDOM() && !SERVER_APP_STATE) {
      SERVER_APP_STATE = (window as any).__SERVER_APP_STATE__ as Promise<any>[];
    }

    this.state = {
      data: SERVER_APP_STATE,
      previousLocation: null,
      currentLocation: props.location,
    };

    this.prefetcherCache = {};
    this.NotfoundComponent = get404Component(props.routes);
  }

	// i know it's little confusing but you will get used to it
  static getDerivedStateFromProps(
    props: AfterpartyProps,
    state: AfterpartyState
  ) {
    const currentLocation = props.location;
    const previousLocation = state.currentLocation;

    const navigated = currentLocation !== previousLocation;
    if (navigated) {
      return {
        previousLocation,
        currentLocation,
        data: undefined,
      };
    }

    return null;
  }

  componentDidUpdate(_prevProps: AfterpartyProps, prevState: AfterpartyState) {
    const navigated = prevState.currentLocation !== this.state.currentLocation;
    if (navigated) {
      const {
        location,
        history,
        routes,
        data,
        match,
        staticContext,
        children,
        ...rest
      } = this.props;
      loadInitialProps(routes, location.pathname, {
        location: location,
        history: history,
        ...rest,
      })
        .then(({ data }) => {
          // Only for page changes, prevent scroll up for anchor links
          if (
            (prevState.previousLocation &&
              prevState.previousLocation.pathname) !== location.pathname
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
    const { location } = this.props;
    const initialData = this.prefetcherCache[location.pathname] || data;

    return (
      <Switch>
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
            location={previousLocation || location}
            render={props =>
              React.createElement(r.component, {
                ...initialData,
                history: props.history,
                location: previousLocation || location,
                match: props.match,
                prefetch: this.prefetch,
              })
            }
          />
        ))}
      </Switch>
    );
  }
}
export const After = withRouter(Afterparty);
