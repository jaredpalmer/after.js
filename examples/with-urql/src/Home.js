import React, {Component} from 'react';
import logo from './react.svg';
import './Home.css';
import {Link} from 'react-router-dom';
import {query, ConnectHOC} from 'urql';

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
      return urql.executeQuery(query(QUERY)).catch(e => console.error(e));
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
        <Link to="/about">About -></Link>
      </div>
    );
  }
}

export default ConnectHOC({query: query(QUERY)})(Home);
