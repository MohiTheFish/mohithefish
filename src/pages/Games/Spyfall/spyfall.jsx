import React, {useState} from 'react';
import {connect} from 'react-redux';
import './spyfall.scss';

import { 
  addLocationSpyfall,
  removeLocationSpyfall,
  addNameSpyfall,
  removeNameSpyfall,
} from 'redux/actions/spyfallActions';
import store from 'redux/store';

function mapStateToProps(state) {
  const gd = state.gameData;
  const ps = state.playState;
  const game = ps.spyfall;
  return {
    gameCredentials: state.gameCredentials,
    
    time: ps.time,
    selectedLocations: game.selectedLocations,
    selectedNamesByIndex: game.selectedNamesByIndex,
    isSpy: game.spyIndex === gd.myIndex,
    locations: game.locations,
    secretLocation: game.secretLocation,
  };
}

function Spyfall(props) {
  const {
    gameCredentials,
    time,
    selectedLocations,
    selectedNamesByIndex,
    isSpy,
    locations,
    secretLocation,
  } = props;
  
  const [host, ] = useState(store.getState().gameData.host);
  const [members, ] = useState(store.getState().gameData.members);



  function getSelectedClassL(val, set, addCall, removeCall) {
    const isSelected = set.has(val);
    let callback = addCall;
    let selectClass = "";
    if (isSelected) {
      callback = removeCall;
      selectClass = "selected";
    }
    return [selectClass, (data) => store.dispatch(callback(data))];
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
        <h4 key={name}
         className={selectClass}
         onClick={callback}>
          {name}
        </h4>
      )
    })
  }

  function renderLocations() {
    return locations.map( (value, index) => {
      const [selectClass, callback] = getSelectedClassL(value, selectedLocations, addLocationSpyfall, removeLocationSpyfall);
      return (
        <div
          key={value} 
          className={`location vertically-center-text ${selectClass}`}
          onClick={callback}
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
  return (
    <div className="wrapper spyfall-page-wrapper">
      <div className="header">
        
        <h1>Play Spyfall</h1>
        <h4>Your name is: {gameCredentials.username}</h4>
          {
            isSpy 
            ? <h4>You ARE the spy! <span role="img" aria-label="spy emoji">🕵️</span> <br/> Figure out the secret location!</h4>
            : <h4>You are NOT the spy. <br/> The location is <span className="secret-location">{secretLocation}</span></h4>
          }
      </div>
      <div className="time-wrapper">
        {renderTime()}
      </div>

      <div className="players-list">
        <h2 className="header">Players</h2>
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
        <h2 className="header">Locations</h2>
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
// export default class Spyfall extends React.Component {
//   constructor(props) {
//     super(props);

//     /* Best way to keep track of the name after refreshing??? */
//     const { username, gamename } = store.getState().gameCredentials;
//     this.myName = username;
//     this.gameName = gamename;

//     this.state = {
//       selectedLocations: new Set(),
//       selectedNames: new Set(),
//       isSpy: true,
//     }

//     /** Event Handlers */
//     this.select = this.select.bind(this);
//     this.deselect = this.deselect.bind(this);

//     this.selectName = this.selectName.bind(this);
//     this.deselectName = this.deselectName.bind(this);

//     /** Render functions */
//     this.renderNames = this.renderNames.bind(this);
//     this.renderLocations = this.renderLocations.bind(this);
//   }

//   // componentDidMount() {
//   //   document.title = "Spyfall";
//   // }

//   componentDidMount() {
//     document.title = "Spyfall";
//   }

//   selectName(e) {
//     const { selectedNames } = this.state;
//     selectedNames.add(e.target.innerHTML);
//     this.setState({
//       selectedNames,
//     });
//   }

//   deselectName(e) {
//     const { selectedNames } = this.state;
//     selectedNames.delete(e.target.innerHTML);
//     this.setState({
//       selectedNames,
//     });
//   }

//   select(e) {
//     const { selectedLocations } = this.state;
//     selectedLocations.add(e.target.textContent);
    
//     this.setState({
//       selectedLocations
//     });
//   }

//   deselect(e) {
//     const { selectedLocations } = this.state;
//     selectedLocations.delete(e.target.textContent);

//     this.setState({
//       selectedLocations
//     });
//   }


//   renderNames() {
//     const { selectedNames } = this.state;
//     return names.map(name => {
//       const isSelected = selectedNames.has(name);
//       let callback = this.selectName;
//       let selectClass = "";
//       if (isSelected) {
//         callback = this.deselectName;
//         selectClass = "selected";
//       }
      
//       return (
//         <h4 key={name}
//          className={selectClass}
//          onClick={callback}>
//           {name}
//         </h4>
//       )
//     })
//   }

//   renderLocations() {
//     const { selectedLocations } = this.state; 
//     return locations.map(value => {
//       const isSelected = selectedLocations.has(value);
//       let callback = this.select;
//       let selectClass = "";
//       if (isSelected) {
//         callback = this.deselect;
//         selectClass = "selected";
//       }

//       return (
//         <div
//           key={value} 
//           className={`location vertically-center-text ${selectClass}`}
//           onClick={callback}
//         > 
//           <p>{value}</p>
//         </div>
//       );
//     });
//   }

//   render () {
//     return (
//       <div className="wrapper spyfall-page-wrapper">
//         <div className="header-text">
//           <h1>Play Spyfall</h1>
//           <h4>Your name is: {this.myName}</h4>
//           <h4>
//             {
//               this.state.isSpy 
//               ? "You ARE the spy! 🕵️" 
//               : "You are NOT the spy."
//             }
//           </h4>
//         </div>

//         <div className="other-players">
//           <h2 className="header">Other Players</h2>
//           <div className="names">
//             {
//               this.renderNames()
//             }
//           </div>
//         </div>

//         <div className="location-section">
//           <h2 className="header">Locations</h2>
//           <div className="location-wrapper">
//             {
//               this.renderLocations()
//             }
//           </div>
//         </div>
//       </div>
//     );
//   }
// }