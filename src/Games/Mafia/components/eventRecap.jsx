import React from 'react';
import Paper from '@material-ui/core/Paper'

import EventInput from './eventRecapInput';
import './eventRecap.scss';
export function EventRecap(props) {
  return (
    <>
    <div className="papermui event-recap">
      <h3 className="description">Event Recap: Recorded here will be all the game actions (votes made, time of murders).</h3>
      <div className="new-phase">
        <h4>Day 0</h4>
      </div>
      <ul>
        <li>
          zendaya voted for nobody
        </li>
        <li>
          nobody was lynched!
        </li>
      </ul>
      <div className="new-phase">
        <h4>Night 1</h4>
      </div>
      
      <ul>
        <li>
          zendaya voted for nobody
        </li>
        <li>
          nobody was lynched!
        </li>
        
        <li>
          zendaya voted for nobody
        </li>
        <li>
          nobody was lynched!
        </li>
        <li>
          zendaya voted for nobody
        </li>
        <li>
          nobody was lynched!
        </li>
        <li>
          zendaya voted for nobody
        </li>
        <li>
          nobody was lynched!
        </li>
        <li>
          zendaya voted for nobody
        </li>
        <li>
          nobody was lynched!
        </li>
        <li>
          zendaya voted for nobody
        </li>
        <li>
          nobody was lynched!
        </li>
        <li>
          zendaya voted for nobody
        </li>
        <li>
          nobody was lynched!
        </li>
        <li>
          zendaya voted for nobody
        </li>
        <li>
          nobody was lynched!
        </li>
        <li>
          zendaya voted for nobody
        </li>
        <li>
          nobody was lynched!
        </li>
        <li>
          zendaya voted for nobody
        </li>
        <li>
          nobody was lynched!
        </li>
        <li>
          zendaya voted for nobody
        </li>
        <li>
          nobody was lynched!
        </li>
        <li>
          zendaya voted for nobody
        </li>
        <li>
          nobody was lynched!
        </li>
      </ul>
      
    </div>
    <EventInput />
    </>
  )
}