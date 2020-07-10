import React from 'react';

function About({ a }) {
  return <div>{a}</div>;
}

About.getInitialProps = async () => {
  const a = await new Promise(resolve =>
    setTimeout(() => resolve('Salamm'), 10000)
  );
  return { a };
};

export default About;
