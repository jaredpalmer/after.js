import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ArticlePage extends Component {
  public static async getInitialProps({ req, res, match, history, location, ...ctx }: any) {
    // getInitialProps is a method by after.js
    return { whatever: 'stuff' };
  }

  public render() {
    return (
      <div className="ArticlePage">
        <div className="ArticlePage-header">
          <h2>Welcome to After.js</h2>
        </div>
        <p className="ArticlePage-intro">
          This page is being rendered by razzle + afterJS
        </p>
        <Link to="/home">Home Page -></Link>
      </div>
    );
  }
}

export default ArticlePage;