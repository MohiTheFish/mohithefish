import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Testing from 'pages/testing'
import MainPage from 'pages/MainPage/mainPage';
import Games from 'pages/Games/games';
import Spyfall from 'pages/Games/Spyfall/spyfall';
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
      <HashRouter basename="/">
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/testing" component={Testing} /> 
          <Route path="/testcomponent" component={NavBar} />
          <Route exact path="/games" component={Games} />
          <Route path="/games/spyfall" component={Spyfall} />

          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
