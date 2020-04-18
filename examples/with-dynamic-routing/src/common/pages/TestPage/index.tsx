import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class StartPage extends Component {
  public static async getInitialProps({ req, res, match, history, location, ...ctx }: any) {
    // getInitialProps is a method by after.js
    return { whatever: 'stuff' };
  }

  public render() {
    return (
      <div className="StartPage">
        <div className="StartPage-header">
          <h2>Welcome to After.js</h2>
        </div>
        <p className="StartPage-intro">
          This page is being rendered by razzle + afterJS
        </p>
        <Link to="/article">Article -></Link>
      </div>
    );
  }
}

export default StartPage;