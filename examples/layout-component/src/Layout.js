import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function Layout({ children, title = 'This is the default title' }) {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Helmet>
      <header>
        <nav>
          <Link to="/">Home</Link> <Link to="/about">About</Link>{' '}
        </nav>
      </header>

      {children}

      <footer>{'I`m here to stay'}</footer>
    </div>
  );
}

export default Layout;
