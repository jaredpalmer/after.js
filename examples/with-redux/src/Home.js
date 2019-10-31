import React from "react";
import logo from "./react.svg";
import "./Home.css";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { fetchTest } from "./actions";

const Home = props => {
  const renderList = () => {
    return props.posts.map(post => {
      return <li key={post.id}>{post.title}</li>;
    });
  };

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="Home">
        <div className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <h2>Welcome to After.js</h2>
        </div>
        <p className="Home-intro">
          To get started, edit <code>src/Home.js</code> or{" "}
          <code>src/About.js</code>and save to reload.
        </p>
        <Link to="/about">About -></Link>
        <ul className="list-container">{renderList()}</ul>
      </div>
    </>
  );
};

Home.getInitialProps = async ({ store }) => {
  await store.dispatch(fetchTest());
  // u can get initial states with store.getState()
  //console.log(store.getState());
};

const mstp = ({ posts }) => ({ posts });

export default connect(
  mstp,
  { fetchTest }
)(Home);
