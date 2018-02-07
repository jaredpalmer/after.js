import React from 'react';
import { NavLink } from 'react-router-dom';

const Layout = ({ children }) => (
  <div>
    <NavLink to="/">Home</NavLink>
    <NavLink to="/about">About</NavLink>
    <NavLink to="/contact">Contact</NavLink>
    { children }
  </div>
);

export default Layout;