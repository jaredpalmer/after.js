import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import './Home.css';
import { Link } from 'react-router-dom';

const QUERY = gql`
  query AboutFilm($id: ID!) {
    film(filmID: $id) {
      id
      title
      director
    }
  }
`;

function About(props) {
  const { data } = props;
  if (data.loading) {
    return <div>Loading Film...</div>;
  }
  const { film } = data;
  return (
    <div>
      <div>
        {film.title} has be directed by {film.director}
      </div>
      <Link to="/">Home -></Link>
    </div>
  );
}

export default graphql(QUERY, {
  options: ({ match: { params: { id } } }) => ({ variables: { id } }),
})(About);
