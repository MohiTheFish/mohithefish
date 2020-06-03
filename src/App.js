import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Testing from 'pages/testing'
import MainPage from 'pages/MainPage/mainPage';
import Games from 'pages/Games/games';
import { Spyfall, SpyfallWaitingRoom } from 'pages/Games/Spyfall';
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

function ComebackGame(props) {
  const { match: {params}} = props;
  console.log(props);
  return <div>
    <h1>
      <span style={{textTransform: "uppercase"}}>{params.name}</span> is not yet built. Come back soon.
      </h1>
  </div>;
}

function App() {  
  return (
    <ThemeProvider theme={theme}>
      <HashRouter basename="/">
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/testing" component={Testing} /> 
          <Route path="/testcomponent" component={NavBar} />
          <Route exact path="/games" component={Games} />
          <Route path="/games/spyfall" component={SpyfallWaitingRoom} />
          <Route path="/games/spyfall/play" component={Spyfall} />
          <Route path="/games/:name" component={ComebackGame} />

          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
