import React from 'react';
import './Home.css';
import {Link} from 'react-router-dom';
import {query, ConnectHOC, formatTypeNames} from 'urql';

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
      const q = formatTypeNames(query(QUERY, {id: match.params.id}));
      return urql.executeQuery(q).then(props => {
        props.loaded = true;
        return props;
      });
    }
  }
  render() {
    const {data, loaded} = this.props;
    if (!loaded) {
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
