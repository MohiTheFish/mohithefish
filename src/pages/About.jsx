import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';

import flightSimImg from 'assets/images/flightsim.png';

import './About.scss';

const projects = [
  {
    to: '/flight-sim',
    title: "Flight Simulator",
    image: flightSimImg,
    alt: "A flight simulator game",
    details: "This was an exercise in terrain generation and camera transformation as part of my computer graphics course at UIUC."
  },
];

function LinkCard({ to, title, image, alt, details }) {
  return (
    <Link to={to} className="link-card">
      <Paper className="paper">
        <h2>{title}</h2>
        <p>{details}</p>
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
        {
          projects.map((p)=> {
            const {to, title, image, alt, details} = p;
            return <LinkCard key={to} to={`${base}${to}`} title={title} image={image} alt={alt} details={details} />;
          })
        }
      </div>
    </div>
  )
}