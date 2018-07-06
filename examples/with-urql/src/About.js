import React from 'react';
import './Home.css';
import {Link} from 'react-router-dom';
import {query, ConnectHOC} from 'urql';

const QUERY = /* GraphQL */ `
  query AboutFilm($id: ID!) {
    film(filmID: $id) {
      id
      title
      director
    }
  }
`;

class About extends React.Component {
  static async getInitialProps({urql, match}) {
    if (urql) {
      return urql
        .executeQuery(query(QUERY, {id: match.params.id}))
        .catch(e => console.error(e));
    }
  }
  render() {
    const {data} = this.props;
    if (data.loading) {
      return <div>Loading Film...</div>;
    }
    const {film} = data;
    return (
      <div>
        <div>
          {film.title} is directed by {film.director}
        </div>
        <Link to="/">Home -></Link>
      </div>
    );
  }
}

export default ConnectHOC(props => {
  return {query: query(QUERY, {id: props.match.params.id})};
})(About);
