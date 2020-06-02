import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Testing from 'pages/testing'
import MainPage from 'pages/MainPage/mainPage';
import Games from 'pages/Games';
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
  console.log(process.env.PUBLIC_URL);
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter basename={`${process.env.PUBLIC_URL}/mohithefish`}>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/testing" component={Testing} /> 
          <Route path="/testcomponent" component={NavBar} />
          <Route path="/games" component={Games} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
