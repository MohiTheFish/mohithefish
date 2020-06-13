import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import Testing from 'pages/testing'
import MainPage from 'pages/MainPage/mainPage';
import Games from 'Games/games';
import Spyfall from 'Games/Spyfall';
import WaitingRoom from 'Games/WaitingRoom/waitingRoom';
import BackToLobby from 'components/BackToLobby/backToLobby';
import store from 'redux/store';

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


// function ComebackGame(props) {
//   const { match: {params}} = props;
//   return <div>
//     <h1>
//       <span style={{textTransform: "uppercase"}}>{params.name}</span> is not yet built. Come back soon.
//       </h1>
//   </div>;
// }

function App() {  
  return (
    <ThemeProvider theme={theme}>
    <Provider store={store}>
    <HashRouter basename="/">
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/testing" component={Testing} /> 
          <Route path="/testcomponent" component={BackToLobby} />

          <Route path="/games/spyfall/play" component={Spyfall} />
          <Route path="/games/:name" component={WaitingRoom} />
          
          <Route path="/games" component={Games} />

          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
    </HashRouter>
    </Provider>
    </ThemeProvider>
  );
}

export default App;
