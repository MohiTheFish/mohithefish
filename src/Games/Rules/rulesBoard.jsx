import React from 'react';
import Paper from '@material-ui/core/Paper';
import store from 'redux-store';
import './rulesBoard.scss';

const SpyfallRules = 
<ul>
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


const MafiaRules = 
<ul>
  <li>Require a minimum of 3 players.</li>
  <li>
    During the day, you may discuss and vote on a player to kill. 
    If an absolute majority votes for a single player (that is, at minimum, half of all remaining members) they will be put on trial. 
    They will be allowed to defend themselves (for the length of duration as specified by DefenseTimeLimit). 
    Afterwards, players can choose to decide whether that player is killed. 
  </li>
  <li>For this second round of voting, a SIMPLE majority is sufficient (more Guilty votes than Not Guilty Vote) to kill the player. Choosing to ignore voting will allow the larger side to win!</li>
  <li>There is a chat box provided for convenience. </li>
  <li>Note: For the chatbox, during the day, EVERYONE can see your messages. At night, only you can see your messages (UNLESS you are mafia, in which case all mafia communicate at night)</li>
  <li></li>
</ul>

function pickRules() {
  const gamename = store.getState().gameCredentials.gamename;
  switch(gamename) {
    case 'mafia': {
      return MafiaRules;
    }
    default: {
      return SpyfallRules;
    }
  }
}
export default function RulesBoard() {
  return (
    <Paper className="board-wrapper rules-board-wrapper">
      <div className="settings-header">
        <h1>Rules</h1>
      </div>
      {pickRules()}
    </Paper>
  )
}