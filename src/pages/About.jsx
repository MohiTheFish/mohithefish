import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';

import flightSimImg from 'assets/images/flightsim.png';

import './About.scss';

function LinkCard({ to, title, image, alt }) {
  return (
    <Link to={to} className="link-card">
      <Paper className="paper">
        <h2>{title}</h2>
        <img src={image} alt={alt} />
      </Paper>
    </Link>
  )
}


export default function AboutPage({ match }) {
  const base = match.url;
  return (
    <div className="about-page">
      <h1>Projects</h1>
      <div className="projects-container">
        <LinkCard to={`${base}/flight-sim`} title="Flight Simulator" image={flightSimImg} alt="A flight simulator game"/>
      </div>
    </div>
  )
}