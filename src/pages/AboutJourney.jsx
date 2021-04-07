import React from 'react';
import {Route, Switch} from 'react-router-dom';
import FlightSimulator from './mp3/MP3';
import AboutPage from './About';

const routes = [
  {
    exact: true,
    path: '/',
    component: AboutPage,
  },
  {
    exact: false,
    path: '/flight-sim',
    component: FlightSimulator,
  },
]

/**
 * @param {*} match Input from React-Router that holds the current path location 
 * @returns JSX Component
 */
export default function About({ match }) {
  const base = match.url;
  return (
    <div className="about-wrapper">
      <Switch>
        {
          routes.map(( {path, exact, component }) => <Route key={path} exact={exact} path={`${base}${path}`} component={component} /> )
        }
      </Switch>
    </div>
  )
}