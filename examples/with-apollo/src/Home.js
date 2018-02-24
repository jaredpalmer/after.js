import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import logo from './react.svg';
import './Home.css';
import { Link } from 'react-router-dom';

const QUERY = gql`
  query AllFilms {
    allFilms {
      films {
        id
        title
      }
    }
  }
`;

function Home(props) {
  const { data } = props;
  return (
    <div className="Home">
      <div className="Home-header">
        <img src={logo} className="Home-logo" alt="logo" />
        <h2>Welcome to After.js with Apollo</h2>
      </div>
      <div className="Home-intro">
        {data.loading === true ? (
          <div>'Loading Data...</div>
        ) : (
          data.allFilms.films.map(({ title, id }, i) => (
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

export default graphql(QUERY)(Home);
