import * as React from 'react';
import { withRouter, match as Match, RouteComponentProps } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { loadInitialProps } from './loadInitialProps';
import { History, Location } from 'history';
import { AsyncRouteProps } from './types';

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

  constructor(props: AfterpartyProps) {
    super(props);

    this.state = {
      data: props.data,
      previousLocation: null
    };

    this.prefetcherCache = {};
  }

  // only runs clizzient
  componentWillReceiveProps(nextProps: AfterpartyProps) {
    const navigated = nextProps.location !== this.props.location;
    if (navigated) {
      window.scrollTo(0, 0);
      // save the location so we can render the old screen
      this.setState({
        previousLocation: this.props.location,
        data: undefined // unless you want to keep it
      });

      const { data, match, routes, history, location, staticContext, ...rest } = nextProps;

      loadInitialProps(this.props.routes, nextProps.location.pathname, {
        location: nextProps.location,
        history: nextProps.history,
        ...rest
      })
        .then(({ data }) => {
          this.setState({ previousLocation: null, data });
        })
        .catch((e) => {
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
  };

  render() {
    const { data } = this.state;
    const { location } = this.props;
    const initialData = this.prefetcherCache[location.pathname] || data || {};
    return renderRoutes(this.props.routes, {
      ...initialData,
      prefetch: this.prefetch
    });
  }
}
export const After = withRouter(Afterparty);
