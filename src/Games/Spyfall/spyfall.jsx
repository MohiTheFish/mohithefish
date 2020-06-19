import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import './spyfall.scss';

import BackToLobby from 'components/BackToLobby/backToLobby';

import { 
  handleLocationSpyfall,
  addNameSpyfall,
  removeNameSpyfall,
} from 'redux-store/actions/spyfallActions';
import store from 'redux-store';

function mapStateToProps(state) {
  const gd = state.gameData;
  const ps = state.playState;
  const game = ps.spyfall;
  return {
    gameCredentials: state.gameCredentials,
    
    time: ps.time,
    gameType: gd.settings.spyfall.gameType,
    isPlaying: gd.isPlaying,
    selectedLocations: game.selectedLocations,
    selectedNamesByIndex: game.selectedNamesByIndex,
    isSpy: game.spyIndex === gd.myIndex,
    locations: game.locations,
    secretLocation: game.secretLocation,
  };
}
function getValues() {
  const gd = store.getState().gameData;
  return {
    host: gd.host,
    members: gd.members,
    myIndex: gd.myIndex,
  };
}

function getDescriptor(gameType) {
  switch(gameType) {
    case 'Foods': {
      return 'food';
    }
    default: return 'location';
  }
}
function Spyfall(props) {
  const {
    gameCredentials,
    time,
    gameType,
    selectedLocations,
    selectedNamesByIndex,
    isSpy,
    locations,
    secretLocation,
    isPlaying,
  } = props;
  
  const [obj, ] = useState(getValues());
  const {
    host, 
    members, 
    myIndex
  } = obj;

  if(!isPlaying) {
    return <Redirect to="/games/spyfall" />;
  }


  function getSelectedClassN(val, set, addCall, removeCall) {
    const isSelected = set.has(val);
    let callback = addCall;
    let selectClass = "";
    if (isSelected) {
      callback = removeCall;
      selectClass = "selected";
    }
    return [selectClass, (data) => store.dispatch(callback(val))];
  }

  function renderNames() {
    return members.map( (name, index) => {
      const [selectClass, callback] = getSelectedClassN(index, selectedNamesByIndex, addNameSpyfall, removeNameSpyfall);
      return (
        <h4 key={`${name}${index}`}
         className={selectClass}
         onClick={callback}>
          {name}
        </h4>
      )
    })
  }

  function locationSelectHandler(data) {
    store.dispatch(handleLocationSpyfall(data));
  }
  function getSelectedClassL(val) {
    const state = selectedLocations.get(val);
    switch(state) {
      case 0: {
        return "";
      }
      case 1: {
        return "accept";
      }
      case 2: {
        return "ignore";
      }
      default: {
        return "";
      }
    }
  }
  function renderLocations() {
    return locations.map( (value, index) => {
      const selectClass = getSelectedClassL(value);
      return (
        <div
          key={value} 
          className={`location vertically-center-text ${selectClass}`}
          onClick={locationSelectHandler}
        > 
          <p>{value}</p>
        </div>
      );
    });
  }

  function renderTime() {
    const minutes = Math.floor(time / 60); 
    const seconds = time % 60;

    return <h3>{minutes}:{seconds.toString().padStart(2, '0')}</h3>
  }

  const [selectClass, callback] = getSelectedClassN(-1, selectedNamesByIndex, addNameSpyfall, removeNameSpyfall);
  
  const headerRow = myIndex === -1
  ? <div className="header-row">
      <BackToLobby />
      <h1>Play Spyfall</h1>
      {/* <BackToLobby /> */}
    </div>
  : <div className="header-row">
      <h1>Play Spyfall</h1>
    </div>

  return (
    <div className="wrapper play-games-wrapper spyfall-page-wrapper">
      <div className="header">
        {headerRow}
        <h4>Your name is: {gameCredentials.username}</h4>
          {
            isSpy 
            ? <h4>You ARE the spy! <span role="img" aria-label="spy emoji">🕵️</span> <br/> Figure out the secret {getDescriptor(gameType)}!</h4>
            : <h4>You are NOT the spy. <br/> The {getDescriptor(gameType)} is <span className="secret-location">{secretLocation}</span></h4>
          }
      </div>
      <div className="time-wrapper">
        {renderTime()}
      </div>

      <div className="players-list">
        <h2 className="title">Players</h2>
        <div className="names">
          <h4 key={host}
            className={selectClass}
            onClick={callback}>
              {host}
          </h4>
          {
            renderNames()
          }
        </div>
      </div>

      <div className="location-section">
        <h2 className="header">{gameType}</h2>
        <div className="location-wrapper">
          {
            renderLocations()
          }
        </div>
      </div>
    </div>
  );

}
const SubscribedSpyfall = connect(mapStateToProps)(Spyfall);
export default SubscribedSpyfall;