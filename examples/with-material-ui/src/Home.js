import React from 'react';
import { Container, Typography, Box, Link as MuiLink } from '@material-ui/core';
import ProTip from './ProTip';
import { Link } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <MuiLink color="inherit" href="https://material-ui.com/">
        Your Website
      </MuiLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Home() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          After.js example
        </Typography>
        <MuiLink component={Link} to="/about" color="secondary">
          Go to the about page
        </MuiLink>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
