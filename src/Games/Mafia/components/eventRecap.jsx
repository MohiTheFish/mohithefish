import React from 'react';
import Paper from '@material-ui/core/Paper'

import EventInput from './eventRecapInput';
import './eventRecap.scss';
export function EventRecap(props) {
  return (
    <>
    <Paper className="event-recap">
      <h3 className="description">Event Recap: Recorded here will be all the game actions (votes made, time of murders).</h3>
      <ul>
        <li>
          zendaya voted for nobody
        </li>
        <li>
          nobody was lynched!
        </li>
      </ul>
    </Paper>
    <EventInput />
    </>
  )
}