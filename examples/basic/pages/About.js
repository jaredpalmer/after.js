import React from 'react';
import { Route, Link } from 'react-router-dom';
import Nav from '../components/Nav';

class About extends React.Component {
  render() {
    return (
      <div>
        <Nav />About
        <Link to="/about/thing">Thing</Link>
        <Route path="/about/thing" exact render={() => <div>Things</div>} />
      </div>
    );
  }
}

export default About;
