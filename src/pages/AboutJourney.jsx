import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {aboutRoutes} from 'constants/projects';

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
          aboutRoutes.map(( {path, exact, component }) => <Route key={path} exact={exact} path={`${base}${path}`} component={component} /> )
        }
      </Switch>
    </div>
  )
}