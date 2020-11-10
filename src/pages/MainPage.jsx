import { gamesJourney } from 'constants/constants';
import React from 'react';
import { Link } from 'react-router-dom';

import './MainPage.scss';

export default function MainPage() {
  return (
    <div className="main-page-wrapper">
      <div className="intro">
        <h1>Muhammed Imran</h1>
        <h2>MohiTheFish</h2>

        <Link to={`${gamesJourney}/games`}>Click me to see some games.</Link> 
        <Link to={`/about-me`}>Click me to learn about me!</Link>

      </div>
    </div>
  )
}