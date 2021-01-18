import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from './components/theme'

ReactDOM.render(
  <Suspense fallback={<div></div>}>
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <App/>
      </React.StrictMode>
    </ThemeProvider>
  </Suspense>,
  document.getElementById('root')
);
