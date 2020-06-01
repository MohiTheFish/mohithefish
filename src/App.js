import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Testing from 'pages/testing'
import MainPage from 'pages/MainPage/mainPage';
import Loading from 'components/Loading/loading';
import NavBar from 'components/NavBar/navbar';

import './App.css';


import { ThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: green,
  },
  status: {
    danger: 'orange',
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/testing" component={Testing} /> 
          <Route path="/testcomponent" component={NavBar} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
