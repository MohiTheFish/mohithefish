import React from 'react';
import Paper from '@material-ui/core/Paper';

import './rulesBoard.scss';

const SpyfallRules = <ul>
  <li>The spy, at any time, can reveal they are a spy and try and guess the location. If they are correct, they win! Otherwise, the players win. </li> 
  <li>Additionally, at any time, or after the round end timer goes off, any member can accuse a player of being a spy. 
  When this happens, a vote is made to see if every other player agrees with the accusation. 
  When voting, each player may also give a reason for their vote, or any other statement they may like.  
  In a mid-round vote every player must agree unanimously for the accusation to stand, at which point the player is revealed. 
  If they are a spy, the team wins, if not, the spy wins. </li>
  <li>If the game makes it to the end, the spy still may come forward before end-game voting is called to guess the location, at which point the same rules apply. 
  Once the final bell rings and players are called to vote, however, it is too late for the spy to win by guessing the location. </li>
  <li>At the end of the game, the player with the most votes is revealed, if they are a spy, the team wins. If they are not, the spy wins!</li>
  </ul>

export default function RulesBoard() {
  return (
    <Paper className="board-wrapper rules-board-wrapper">
      <div className="settings-header">
        <h1>Rules</h1>
      </div>
      {SpyfallRules}
    </Paper>
  )
}