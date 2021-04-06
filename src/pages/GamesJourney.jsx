import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Testing from 'pages/testing'
import Games from 'Games/games';
import Spyfall from 'Games/Spyfall';
import Mafia from 'Games/Mafia';
import WaitingRoom from 'Games/WaitingRoom/waitingRoom';
import store from 'Games/redux-store';

function ComebackGame(props) {
  const { match: {params}} = props;
  return (
    <div>
      <h1>
        <span style={{textTransform: "uppercase"}}>{params.name}</span> is not yet built. Come back soon.
        </h1>
    </div>
  );
}

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
  },
  {
    path: undefined, 
    component: ComebackGame
  }
]

export default function GamesJourney({ match }) {
  const base = match.url;
  return (
    <Provider store={store}>
      <Switch>
        {
          routes.map(( {path, component }) => <Route key={path ? path : 'undefined'} path={`${base}${path}`} component={component} /> )
        }
      </Switch>
    </Provider>
  )
}