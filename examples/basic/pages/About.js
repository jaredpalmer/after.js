import React from 'react';
import { Route, Link } from 'react-router-dom';
import Nav from '../components/Nav';

class About extends React.Component {
  static async getInitialProps({ req }) {
    return { about: 'me' };
  }

  render() {
    return (
      <div>
        <Nav />About
        <Link to="/about/thing">Thing</Link>
        {JSON.stringify(this.props.data, null, 2)}
        <Route path="/about/thing" exact render={() => <div>Things</div>} />
      </div>
    );
  }
}

export default About;
