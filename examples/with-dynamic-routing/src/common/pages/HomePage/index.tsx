import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomePage extends Component {
  public static async getInitialProps({ req, res, match, history, location, ...ctx }: any) {
    // getInitialProps is a method by after.js
    return { whatever: 'stuff' };
  }

  public render() {
    return (
      <div className="HomePage">
        <div className="HomePage-header">
          <h2>Welcome to After.js</h2>
        </div>
        <p className="HomePage-intro">
          This page is being rendered by razzle + afterJS
        </p>
        <Link to="/">Start Page -></Link>
      </div>
    );
  }
}

export default HomePage;