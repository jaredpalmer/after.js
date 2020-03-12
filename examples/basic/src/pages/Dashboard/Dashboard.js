import React from 'react';
import { Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

function Dashbord({ route }) {
  return (
    <>
      <h1>Dashboard</h1>
      <Link to="/">Home -></Link>
      <br />
      <Link to="/dashboard/user">User -></Link>
      <br />
      <Link to="/dashboard/changePassword">Change Password -></Link>
      <br />
      {renderRoutes(route.routes)}
    </>
  );
}

export default Dashbord;
