import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ensureReady, After } from '@jaredpalmer/after';
import { ThemeProvider } from '@material-ui/core/styles';
import RTL from './RTL';
import routes from './routes';
import theme from './theme';

function Main({ data }) {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <BrowserRouter>
      <RTL>
        <ThemeProvider theme={theme}>
          <After data={data} routes={routes} />
        </ThemeProvider>
      </RTL>
    </BrowserRouter>
  );
}

ensureReady({ routes }).then(data =>
  hydrate(<Main data={data} />, document.getElementById('root'))
);

if (module.hot) {
  module.hot.accept();
}
