import React from 'react';
import logo from './react.svg';
import { HomeContainer, HomeHeader, HomeIntro } from './home.styles';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <HomeContainer>
      <HomeHeader>
        <img src={logo} className="home-logo" alt="logo" />
        <h2>Welcome to After.js</h2>
      </HomeHeader>
      <HomeIntro>
        To get started, edit <code>src/Home.js</code> or{' '}
        <code>src/About.js</code>and save to reload.
      </HomeIntro>
      <Link to="/about">About -></Link>
    </HomeContainer>
  );
}

Home.getInitialProps = async ({
  req,
  res,
  match,
  history,
  location,
  ...ctx
}) => {
  return { whatever: 'stuff' };
};

export default Home;
