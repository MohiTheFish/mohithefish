import React from 'react';
import { Link } from 'react-router-dom';

import './mainPage.scss';

export default function MainPage() {
  return (
    <div className="main-page-wrapper">
      <div className="intro">
        <h1>Muhammed Imran</h1>
        <h2>MohiTheFish</h2>

        <Link to="/games">Click me to see some games.</Link> 

      </div>
    </div>
  )
}