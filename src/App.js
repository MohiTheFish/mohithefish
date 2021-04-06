import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import MainPage from 'pages/MainPage';
import About from 'pages/About';
import GamesJourney from 'pages/GamesJourney';
import {gamesJourney} from 'constants/constants';

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
        <Route path={gamesJourney} component={GamesJourney} />
        <Route path="/about-me" component={About} />
        
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </HashRouter>
    </ThemeProvider>
  );
}

export default App;
