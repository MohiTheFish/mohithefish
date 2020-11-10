import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import MainPage from 'pages/MainPage';
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
    <HashRouter basename="/">
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path={gamesJourney} component={GamesJourney} />

        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </HashRouter>
    </ThemeProvider>
  );
}

export default App;
