import React from 'react';
import { Link } from 'react-router-dom';

function About({ data }) {
  return (
    <div>
      <h1>{data}</h1>
      <Link to="/">Home</Link>
    </div>
  );
}

About.getInitialProps = async ({
  req,
  res,
  match,
  history,
  location,
  ...ctx
}) => {
  const data = await new Promise(resolve =>
    setTimeout(() => resolve('About'), 10000)
  );
  return { data };
};

export default About;
