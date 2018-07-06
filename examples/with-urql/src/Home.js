import React, {Component} from 'react';
import logo from './react.svg';
import './Home.css';
import {Link} from 'react-router-dom';
import {query} from 'urql';

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
  static getInitialProps({urql}) {
    return urql
      .executeQuery(query(QUERY))
      .then(r => console.log(r))
      .catch(e => console.error(e));
  }
  render() {
    console.log(this.props);
    return (
      <div className="Home">
        <div className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <h2>Welcome to After.js</h2>
        </div>
        <p className="Home-intro">
          To get started, edit
          <code>src/Home.js</code> or <code>src/About.js</code>and save to
          reload.
        </p>
        <Link to="/about">About -></Link>
      </div>
    );
  }
}

export default Home;
