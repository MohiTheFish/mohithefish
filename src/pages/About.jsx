import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import {projectCards} from 'constants/projects';

import './About.scss';

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
          projectCards.map((p)=> {
            const {to, title, image, alt, details} = p;
            return <LinkCard key={to} to={`${base}${to}`} title={title} image={image} alt={alt} details={details} />;
          })
        }
      </div>
    </div>
  )
}