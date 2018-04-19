import * as React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { loadInitialProps } from './loadInitialProps';

class Afterparty extends React.Component<any, any> {
  prefetcherCache: any;
  constructor(props: any) {
    super(props);
    this.state = {
      data: props.data,
      previousLocation: null,
    };
    this.prefetcherCache = {};
  }

  // only runs clizzient
  componentWillReceiveProps(nextProps: any, nextState: any) {
    const navigated = nextProps.location !== this.props.location;
    if (navigated) {
      window.scrollTo(0, 0);
      // save the location so we can render the old screen
      this.setState({
        previousLocation: this.props.location,
        data: undefined, // unless you want to keep it
      });
      const { data, match, routes, history, location, ...rest } = nextProps;
      loadInitialProps(this.props.routes, nextProps.location.pathname, {
        location: nextProps.location,
        history: nextProps.history,
        ...rest,
      })
        .then(({ data }) => {
          this.setState({ previousLocation: null, data: data });
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
        this.prefetcherCache = Object.assign({}, this.prefetcherCache, {
          [pathname]: data,
        });
      })
      .catch(e => console.log(e));
  };

  render() {
    const { previousLocation, data } = this.state;
    const { location } = this.props;
    const initialData = this.prefetcherCache[location.pathname] || data;
    return (
      <Switch>
        {this.props.routes.map((r: any, i: number) => (
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

export const After = (withRouter as any)(Afterparty);
