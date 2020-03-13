import React from 'react';
import { withRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import { loadInitialProps } from './loadInitialProps';

import { AfterpartyProps, AfterpartyState } from './types';

class Afterparty extends React.Component<AfterpartyProps, AfterpartyState> {
  state = {
    data: this.props.data.initialData,
    previousLocation: null,
    currentLocation: this.props.location,
  };
  prefetcherCache: any = {};

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

    return renderRoutes(
      this.props.routes,
      {
        ...initialData,
        prefetch: this.prefetch,
        location,
      },
      { location }
    );
  }
}
export const After = withRouter(Afterparty);
