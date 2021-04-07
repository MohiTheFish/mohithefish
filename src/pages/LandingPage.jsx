import { gamesJourney } from 'constants/constants';
import React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';


import './LandingPage.scss';

export default function MainPage() {
  return (
    <div className="landing-page-wrapper">
      <div className="intro">
        <h1>Muhammed Imran</h1>
        <h2>MohiTheFish</h2>
        <div className="journey-options">
          <Link to={`${gamesJourney}/games`}>
            <Paper className="papermui-clickable clickable">
              Web games
            </Paper>
          </Link>
          <Link to="/about-me">
            <Paper className="papermui-clickable clickable">
              Learn more about me
            </Paper>
          </Link>
        </div>

      </div>
    </div>
  )
}