import { 
  UPDATE_MAIN_TIME,
} from 'Games/redux-store/actions/specificGameActions/spyfallActions';

import {
  START_GAME_MAFIA,
  CHAT_UPDATED,
  OTHER_PLAYER_VOTED,
  BEGIN_TRIAL,
  SECONDARY_TIME_UPDATE,
  I_VOTED,
  CLEAR_MAFIA_BOARD,
  OTHER_PLAYER_GUILTY_VOTED,
  I_GUILTY_VOTED,
  COURT_RESULT,
  USED_POWER,
  PRIVATE_NIGHT_RESULT,
  PUBLIC_NIGHT_RESULT,
  PLAYER_KILLED,
  MAFIA_GAME_OVER,
  CLOSE_DIALOG,
} from 'Games/redux-store/actions/specificGameActions/mafiaActions';

export const defaultMafiaState = process.env.REACT_APP_DESIGN === 'true' ? {
  phase: 4,
  isRecapPeriod: false,
  secondaryTime: 0,
  role: 1,
  roleCount: {},
  chatHistory: [
    [{audience: 0, message: 'hi'},{audience: 0, message: 'hi'},{audience: 0, message: 'hi'},{audience: 0, message: 'hi'},{audience: 0, message: 'hi'},{audience: 0, message: 'hi'},{audience: 0, message: 'hi'},{audience: 0, message: 'hi'},{audience: 0, message: 'hi'},{audience: 0, message: 'hi'},{audience: 0, message: 'hi'},{audience: 0, message: 'hi'},{audience: 0, message: 'hi'},{audience: 0, message: 'hi'},],
    [{audience: 0, message: 'bye'},{audience: 0, message: 'bye'},{audience: 0, message: 'bye'},{audience: 0, message: 'bye'},{audience: 0, message: 'bye'},{audience: 0, message: 'bye'},{audience: 0, message: 'bye'},{audience: 0, message: 'bye'},{audience: 0, message: 'bye'},{audience: 0, message: 'bye'},{audience: 0, message: 'bye'},{audience: 0, message: 'bye'},],
    [{audience: 0, message: 'cya'},{audience: 0, message: 'cya'},{audience: 0, message: 'cya'},{audience: 0, message: 'cya'},{audience: 0, message: 'cya'},{audience: 0, message: 'cya'},{audience: 0, message: 'cya'},{audience: 0, message: 'cya'},{audience: 0, message: 'cya'},{audience: 0, message: 'cya'},{audience: 0, message: 'cya'},{audience: 0, message: 'cya'},{audience: 0, message: 'cya'},],
    [{audience: 0, message: 'my name is alexander hamilton'},{audience: 0, message: 'my name is alexander hamilton'},{audience: 0, message: 'my name is alexander hamilton'},{audience: 0, message: 'my name is alexander hamilton'},{audience: 0, message: 'my name is alexander hamilton'},],
    [{audience: 0, message: 'lafayette'}]
  ],
  playerProfiles: [
    {numVotes: 0, isAlive: true, role: 2},
    {numVotes: 0, isAlive: false, role: 0},
    {numVotes: 0, isAlive: true, role: 0}, 
    {numVotes: 0, isAlive: true, role: 2},
    {numVotes: 0, isAlive: false, role: 0},
    {numVotes: 0, isAlive: true, role: 1}, 
    {numVotes: 0, isAlive: false, role: 4},
    {numVotes: 0, isAlive: false, role: 3},
    {numVotes: 0, isAlive: true, role: 2},
    {numVotes: 0, isAlive: true, role: 3},
    {numVotes: 0, isAlive: true, role: 5}
  ],
  numAbstain: 0,
  myTarget: -1,
  onTrial: -1,
  isDefending: true,
  myGuiltyDecision: '',
  numGuilty: 0,
  numNotGuilty: 0,
  iAmDead: false,
  gameOver: false,
  showGameOverDialog: false,
  winners: [1, 4, 6],
} : {
  phase: 0,
  isRecapPeriod: true,
  secondaryTime: 0,
  role: -1,
  roleCount: {},
  chatHistory: [[]],
  playerProfiles: [],
  numAbstain: 0,
  myTarget: -1,
  onTrial: -1,
  isDefending: true,
  myGuiltyDecision: '',
  numGuilty: 0,
  numNotGuilty: 0,
  wasSaved: false,
  wasAttacked: false,
  iAmDead: false,
  gameOver: false,
  showGameOverDialog: false,
  winners: [],
};

export function mafiaReducers(state, action) {
  switch(action.type) {
    case START_GAME_MAFIA: {
      const {
        role, 
        roleCount,
        numPlayers,
      } = action.gameState;
      const playerProfiles = [];
      for(var i=0; i<numPlayers; i++) {
        playerProfiles.push({
          numVotes: 0,
          isAlive: true,
          role: -1,
        });
      }
      return {
        ...state,
        time: 0,
        mafia: {
          ...state.mafia,
          role,
          roleCount,
          phase: 0,
          playerProfiles,
        }
      }
    }
    case I_VOTED: //These two cases will be identical, apart from setting the myTarget field
    case OTHER_PLAYER_VOTED: {
      const {
        audience,
        phase,
        message,
        newTarget,
        oldTarget,
      } = action;

      const oldChatHistory =  state.mafia.chatHistory;
      const newChatHistory = oldChatHistory.filter(item => item);
      let numAbstain = state.mafia.numAbstain;
      newChatHistory[phase].push({audience, message});

      const newProfiles = state.mafia.playerProfiles.filter(item => item);
      if(oldTarget >= 0) {
        newProfiles[oldTarget].numVotes--;
      } 
      else if(oldTarget === -2) {
        numAbstain--;
      }

      if(newTarget >= 0) {
        newProfiles[newTarget].numVotes++;
      }
      else if(newTarget === -2) {
        numAbstain++;
      }

      const newMafiaState = {
        ...state.mafia,
        chatHistory: newChatHistory,
        playerProfiles: newProfiles,
        numAbstain,
      };

      if (action.type === I_VOTED) {
        newMafiaState.myTarget = newTarget;
      }

      return {
        ...state,
        mafia: newMafiaState,
      }
    }
    
    case I_GUILTY_VOTED: //These two cases will be identical, apart from setting the myGuiltyDecision field
    case OTHER_PLAYER_GUILTY_VOTED: {
      const {
        audience,
        phase,
        message,
        newDecision,
        oldDecision,
      } = action;

      const oldChatHistory =  state.mafia.chatHistory;
      const newChatHistory = oldChatHistory.filter(item => item);
      newChatHistory[phase].push({audience, message});

      let numGuilty = state.mafia.numGuilty;
      let numNotGuilty = state.mafia.numNotGuilty;
      if (oldDecision === '') {
        if (newDecision[0] === 'g') {
          numGuilty++;
        }
        else if (newDecision[0] === 'n') {
          numNotGuilty++;
        }
      }
      else if (oldDecision[0] === 'g') {
        numGuilty--;
        if (newDecision[0] === 'n') {
          numNotGuilty++;
        }
      }
      else if (oldDecision[0] === 'n') {
        numNotGuilty--;
        if (newDecision[0] === 'g') {
          numGuilty++;
        }

      }

      const newMafiaState = {
        ...state.mafia,
        chatHistory: newChatHistory,
        numGuilty,
        numNotGuilty,
      };

      if (action.type === I_GUILTY_VOTED) {
        newMafiaState.myGuiltyDecision = newDecision;
      }

      return {
        ...state,
        mafia: newMafiaState,
      }
    }

    case CHAT_UPDATED: {
      const {audience, phase, message} = action;
      const oldChatHistory =  state.mafia.chatHistory;
      const newChatHistory = oldChatHistory.filter(item => item);
      //Make sure that phase is valid index withing newChatHistory
      //This will *hopefully* be handled by updating time
      while(newChatHistory.length <= phase) {
        newChatHistory.push([]);
      }
      newChatHistory[phase].push({audience, message});
      return {
        ...state,
        mafia: {
          ...state.mafia, 
          chatHistory: newChatHistory,
        }
      }
    }
    case UPDATE_MAIN_TIME: {
      const [phase, time, isRecapPeriod] = action.data;
      const oldChatHistory =  state.mafia.chatHistory;
      let newChatHistory = oldChatHistory;
      let newProfiles = state.mafia.playerProfiles;
      let numAbstain = state.mafia.numAbstain;
      let myTarget = state.mafia.myTarget;
      let wasAttacked = state.mafia.wasAttacked;
      let wasSaved = state.mafia.wasSaved;
      if (phase !== state.mafia.phase) {
        if (phase % 2 === 0) {
          newProfiles = state.mafia.playerProfiles.map((val) => {
            return {
              ...val,
              numVotes: 0,
            };
          });
          numAbstain = 0;
        }
        myTarget = -1;
        newChatHistory = oldChatHistory.filter(item => item);
        newChatHistory.push([]);
        wasAttacked = false;
        wasSaved = false;

      }
      return {
        ...state,
        time,
        mafia: {
          ...state.mafia,
          chatHistory: newChatHistory,
          phase,
          myTarget,
          isRecapPeriod,
          playerProfiles: newProfiles,
          numAbstain,
          wasAttacked, 
          wasSaved,
        }
      };
    }
    case BEGIN_TRIAL: {
      const {audience, phase, name, onTrial} = action.data;
      const oldChatHistory =  state.mafia.chatHistory;
      const newChatHistory = oldChatHistory.filter(item => item);
      newChatHistory[phase].push({audience, message: `${name} is on trial!`})
      
      return {
        ...state,
        mafia: {
          ...state.mafia,
          chatHistory: newChatHistory,
          onTrial,
        }
      }
    }
    case SECONDARY_TIME_UPDATE: {
      const [phase, secondaryTime, isDefending] = action.data;
      return {
        ...state,
        mafia: {
          ...state.mafia,
          phase,
          secondaryTime,
          isDefending,
        }
      };
    }
    case COURT_RESULT: {
      const {
        message,
        audience,
        phase,
        isAlive,
        killedRole,
        playerRoles,
        killedIndex,
      } = action.data;
      const oldChatHistory =  state.mafia.chatHistory;
      const newChatHistory = oldChatHistory.filter(item => item);
      newChatHistory[phase].push({audience, message});
      let myNewTarget = state.mafia.myTarget;
      // If targeting player on trial, our new target will be nobody.
      if (killedIndex === state.mafia.myTarget) {
        myNewTarget = -1;
      }
      const newProfiles = state.mafia.playerProfiles.filter(item => item);
      const profile = newProfiles[killedIndex];
      profile.numVotes = 0;
      profile.isAlive = isAlive;
      let iAmDead = state.mafia.iAmDead;
      if(!isAlive) {
        profile.role = killedRole;
        if (state.myIndex === killedIndex) {
          iAmDead = true;
          playerRoles.forEach((val, index) => {
            const p = newProfiles[index];
            p.role = val;
          });
        }
      }
      return {
        ...state,
        mafia: {
          ...state.mafia,
          chatHistory: newChatHistory,
          myTarget: myNewTarget,
          playerProfiles: newProfiles,
          myGuiltyDecision: '',
          numGuilty: 0,
          numNotGuilty: 0,
          onTrial: -1,
          isDefending: true,
          iAmDead,
        }
      };
    }
    case USED_POWER: {
      const { message, audience, phase, myIndex, targetIndex } = action.data;
      const oldChatHistory =  state.mafia.chatHistory;
      const newChatHistory = oldChatHistory.filter(item => item);
      newChatHistory[phase].push({audience, message});

      const isMe = myIndex === state.myIndex;
      return {
        ...state,
        mafia: {
          ...state.mafia,
          myTarget: isMe ? targetIndex : state.mafia.myTarget,
          chatHistory: newChatHistory,
        }
      };
    }
    case PRIVATE_NIGHT_RESULT: {
      const { audience, phase, message, wasSaved, wasAttacked } = action.data;
      const oldChatHistory =  state.mafia.chatHistory;
      const newChatHistory = oldChatHistory.filter(item => item);
      newChatHistory[phase].push({audience, message});
      return {
        ...state,
        mafia: {
          ...state.mafia,
          wasSaved,
          wasAttacked,
          chatHistory: newChatHistory,
        }
      }

    }
    case PUBLIC_NIGHT_RESULT: {
      const { 
        phase, 
        index,
        audience,
        message,
        wasKilled,
        killedRole,
        playerRoles,
      } = action.data;
      
      let newPlayerProfiles = state.mafia.playerProfiles;
      let iAmDead = state.mafia.iAmDead;

      let newChatHistory =  state.mafia.chatHistory.filter(item => item);
      while(newChatHistory.length <= phase) {
        newChatHistory.push([]);
      }
      newChatHistory[phase].push({audience, message});

      if(wasKilled) {
        newPlayerProfiles = state.mafia.playerProfiles.filter(item => item);
        newPlayerProfiles[index].isAlive = false;
        newPlayerProfiles[index].role = killedRole;
        if (index === state.myIndex) {
          iAmDead = true;
          newPlayerProfiles.forEach((profile, index) => {
            profile.role = playerRoles[index];
          });
        }
      }
      
      return {
        ...state,
        mafia: {
          ...state.mafia,
          playerProfiles: newPlayerProfiles,
          chatHistory: newChatHistory,
          iAmDead,
        }
      }
    }
    case PLAYER_KILLED: {
      const { index, audience, message, phase, playerRoles, } = action.data;
      
      let newPlayerProfiles = state.mafia.playerProfiles.filter(item => item);
      let iAmDead = state.mafia.iAmDead;

      let newChatHistory =  state.mafia.chatHistory.filter(item => item);
      while(newChatHistory.length <= phase) {
        newChatHistory.push([]);
      }
      newChatHistory[phase].push({audience, message});

      newPlayerProfiles[index].isAlive = false;
      if (index === state.myIndex) {
        iAmDead = true;
        newPlayerProfiles.forEach((profile, index) => {
          profile.role = playerRoles[index];
        });
      }

      return {
        ...state,
        mafia: {
          ...state.mafia,
          iAmDead,
          chatHistory: newChatHistory,
          playerProfiles: newPlayerProfiles,
        }
      };
    }
    case MAFIA_GAME_OVER: {
      const { audience, phase, message, winners, playerRoles, } = action.data;

      let newChatHistory =  state.mafia.chatHistory.filter(item => item);
      while(newChatHistory.length <= phase) {
        newChatHistory.push([]);
      }
      newChatHistory[phase].push({audience, message});

      let newPlayerProfiles = state.mafia.playerProfiles.filter(item => item);
      newPlayerProfiles.forEach((profile, index) => {
        profile.role = playerRoles[index];
      });

      return {
        ...state,
        mafia: {
          ...state.mafia,
          playerProfiles: newPlayerProfiles,
          chatHistory: newChatHistory,
          gameOver: true,
          iAmDead: true,
          showGameOverDialog: true,
          winners,
        }
      }
    }
    case CLOSE_DIALOG: {
      return {
        ...state,
        mafia: {
          ...state.mafia,
          showGameOverDialog: false,
        }
      };
    }
    case CLEAR_MAFIA_BOARD: {
      return {
        ...state,
        mafia: defaultMafiaState
      };
    }
    default: return state;
  }
}
