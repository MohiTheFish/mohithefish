import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Testing from 'pages/testing'
import Games from 'pages/games';
import Spyfall from 'Games/Spyfall';
import Mafia from 'Games/Mafia';
import WaitingRoom from 'Games/WaitingRoom/waitingRoom';
import BackToLobby from 'components/BackToLobby/backToLobby';
import store from 'redux-store';

const routes = [
  {
    path: '/testing',
    component: Testing,
  },
  {
    path: '/testcomponent',
    component: Testing,
  },
  {
    path: '/games/mafia/play',
    component: Mafia,
  },
  {
    path: '/games/spyfall/play',
    component: Spyfall,
  },
  {
    path: '/games/:name',
    component: WaitingRoom,
  },
  {
    path: '/games',
    component: Games,
  }
]
export default function GamesJourney({ match }) {
  const base = match.url;

  return (
    <Provider store={store}>
      <Switch>
        {
          routes.map(( {path, component }) => <Route key={path} path={`${base}${path}`} component={component} /> )
        }
      </Switch>
    </Provider>
  )
}