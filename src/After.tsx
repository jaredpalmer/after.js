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
import { get404Component, getAllRoutes } from './utils';

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
}

class Afterparty extends React.Component<AfterpartyProps, AfterpartyState> {
  prefetcherCache: any;
  NotfoundComponent:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;

  constructor(props: AfterpartyProps) {
    super(props);

    this.state = {
      data: props.data,
      previousLocation: null,
    };

    this.prefetcherCache = {};
    this.NotfoundComponent = get404Component(this.props.routes);
  }

  // only runs clizzient
  componentWillReceiveProps(nextProps: AfterpartyProps) {
    const navigated = nextProps.location !== this.props.location;
    if (navigated) {
      // save the location and data so we can render the old screen
      // first we try to use previousLocation and then location from props
      this.setState(prevState => ({
        previousLocation: prevState.previousLocation || this.props.location,
      }));

      const {
        data,
        match,
        routes,
        history,
        location,
        staticContext,
        ...rest
      } = nextProps;

      loadInitialProps(this.props.routes, nextProps.location.pathname, {
        location: nextProps.location,
        history: nextProps.history,
        ...rest,
      })
        .then(({ data }) => {
          // if data is not for current location just don't do anything
          if (this.props.location !== location) {
            // should we save this data in prefetcherCache ?
            return;
          }

          // Only for page changes, prevent scroll up for anchor links
          if (
            (this.state.previousLocation &&
              this.state.previousLocation.pathname) !==
            nextProps.location.pathname
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
    const initialData =
      this.prefetcherCache[(previousLocation || location).pathname] || data;

    return (
      <Switch location={previousLocation || location}>
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
