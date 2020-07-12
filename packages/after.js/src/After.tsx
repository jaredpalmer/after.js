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
import {
  AsyncRouteProps,
  ServerAppState,
  InitialData,
  TransitionBehavior,
  CtxBase,
} from './types';
import { get404Component, getAllRoutes, isInstantTransition } from './utils';
import { loadStaticProps } from './loadStaticProps';

export interface AfterpartyProps extends RouteComponentProps<any> {
  history: History;
  location: Location;
  data: ServerAppState;
  routes: AsyncRouteProps[];
  match: Match<any>;
  transitionBehavior: TransitionBehavior;
}

export interface AfterpartyState {
  data?: InitialData;
  previousLocation: Location | null;
  currentLocation: Location | null;
  isLoading: boolean;
}

class Afterparty extends React.Component<AfterpartyProps, AfterpartyState> {
  state = {
    data: this.props.data.initialData,
    previousLocation: null,
    currentLocation: this.props.location,
    isLoading: false,
  };

  prefetcherCache: object = {};
  NotfoundComponent:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any> = get404Component(this.props.routes);

  static defaultProps = {
    transitionBehavior: 'blocking' as TransitionBehavior,
  };

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
        isLoading: true,
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
        transitionBehavior,
        // we don't want to pass these
        // to loadInitialProps()
        match,
        staticContext,
        children,
        ...rest
      } = this.props;

      const { scrollToTop, ssg } = data.afterData;
      const isInstantMode: boolean = isInstantTransition(transitionBehavior);
      const isBloackedMode = !isInstantMode;

      const ctx: CtxBase = {
        location,
        history,
        scrollToTop,
        ...rest,
      };

      // Only for page changes, prevent scroll up for anchor links
      const isPageChanged: boolean =
        !!prevState.currentLocation &&
        prevState.currentLocation.pathname !== location.pathname;

      const isAllowedToScroll: boolean =
        isPageChanged && scrollToTop.current === true;

      // in instant mode, first we scroll to top then we fetch the data
      if (isInstantMode && isAllowedToScroll) {
        window.scrollTo(0, 0);
      }

      // in ssg mode we don't call component.getInitialProps
      // instead we fetch the page-data.json file
      const loadData = ssg ? loadStaticProps : loadInitialProps;

      loadData(location.pathname, routes, ctx)
        .then(res => res.data)
        .then((data: InitialData) => {
          // if user moved to a new page at the time we were fetching data
          // for the previous page, we ignore data of the previous page
          if (this.state.currentLocation !== location) return;

          // in blocked mode, first we fetch the data and then we scroll to top
          if (isBloackedMode && isAllowedToScroll) {
            window.scrollTo(0, 0);
          }

          this.setState({ previousLocation: null, data, isLoading: false });
        })
        .catch((e: Error) => {
          // @todo we should more cleverly handle errors???
          console.log(e);
        });
    }
  }

  prefetch = (pathname: string) => {
    const { ssg } = this.props.data.afterData;

    // in ssg mode we don't call component.getInitialProps
    // instead we fetch the page-data.json file
    const loadData = ssg ? loadStaticProps : loadInitialProps;

    loadData(pathname, this.props.routes, {
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
    const { previousLocation, data, isLoading } = this.state;
    const { location: currentLocation, transitionBehavior } = this.props;
    const initialData = this.prefetcherCache[currentLocation.pathname] || data;

    const instantMode = isInstantTransition(transitionBehavior);

    // when we are in the instant mode we want to pass the right location prop
    // to the <Route /> otherwise it will render previous matche component
    const location = instantMode
      ? currentLocation
      : previousLocation || currentLocation;

    return (
      <Switch location={location}>
        {initialData?.statusCode === 404 && (
          <Route component={this.NotfoundComponent} path={location.pathname} />
        )}
        {initialData?.redirectTo && <Redirect to={initialData.redirectTo} />}
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
                isLoading,
              })
            }
          />
        ))}
      </Switch>
    );
  }
}
export const After = withRouter(Afterparty);
