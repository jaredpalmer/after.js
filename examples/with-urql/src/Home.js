import React, {Component} from 'react';
import logo from './react.svg';
import './Home.css';
import {Link} from 'react-router-dom';
import {query, ConnectHOC, formatTypeNames} from 'urql';

const QUERY = /* GraphQL */ `
  query AllFilms {
    allFilms {
      films {
        id
        title
      }
    }
  }
`;

class Home extends Component {
  static async getInitialProps({urql}) {
    if (urql) {
      const q = formatTypeNames(query(QUERY));
      return urql.executeQuery(q).then(props => {
        props.loaded = true;
        return props;
      });
    }
  }
  render() {
    const {data, loaded} = this.props;
    return (
      <div className="Home">
        <div className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <h2>Welcome to After.js with urql</h2>
        </div>
        <div className="Home-intro">
          {!loaded ? (
            <div>'Loading Data...</div>
          ) : (
            data.allFilms.films.map(({title, id}, i) => (
              <div key={id}>
                <Link to={`/about/${i + 1}`}>{title}</Link>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}

export default ConnectHOC({query: query(QUERY)})(Home);