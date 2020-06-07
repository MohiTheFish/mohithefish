import React, {useState} from 'react';
import {connect} from 'react-redux';
import './spyfall.scss';

const locations = [
  'Desert',
  'Swamp',
  'Forest',
  'City',
  'Boat',
  'Crusader Army',
  'World War II Squad',
  'Polar Station',
  'Space Station'
];

function mapStateToProps(state) {
  console.log(state);
  const gd = state.gameData;
  return {
    gameCredentials: state.gameCredentials,
    host: gd.host,
    members: gd.members,
    myIndex: gd.myIndex,
    playState: state.playState,
  };
}

function Spyfall(props) {
  const { gameCredentials, playState, host, members, myIndex } = props;
  console.log(playState);
  const [selectedLocations, setSelectedLocations] = useState(new Set());
  const [selectedNamesByIndex, setSelectedNamesByIndex] = useState(new Set());

  function selectName(index) {
    selectedNamesByIndex.add(index);
    setSelectedNamesByIndex(selectedNamesByIndex);
  }

  function deselectName(index) {
    selectedNamesByIndex.delete(index);
    setSelectedNamesByIndex(selectedNamesByIndex);
  }

  function selectLocation(e) {
    console.log(selectedLocations);
    selectedLocations.add(e.target.textContent);
    console.log(selectedLocations);
    console.log(e.target.textContent);
    setSelectedLocations(selectedLocations);
  }

  function deselectLocation(e) {
    selectedLocations.delete(e.target.textContent);
    setSelectedLocations(selectedLocations);
  }

  function selectedClass(index) {
    const isSelected = selectedNamesByIndex.has(index);
    let callback = selectName;
    let selectClass = "";
    if (isSelected) {
      callback = deselectName;
      selectClass = "selected";
    }
    return [selectClass, () => callback(index)];
  }

  function renderNames() {
    return members.map( (name, index) => {
      const [selectClass, callback] = selectedClass(index);
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
    console.log(locations);
    return locations.map( (value, index) => {
      const [selectClass, callback] = selectedClass(index);
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

  const [selectClass, callback] = selectedClass(-1);
  return (
    <div className="wrapper spyfall-page-wrapper">
      <div className="header-text">
        <h1>Play Spyfall</h1>
        <h4>Your name is: {gameCredentials.username}</h4>
        <h4>
          {
            true 
            ? "You ARE the spy! 🕵️" 
            : "You are NOT the spy."
          }
        </h4>
      </div>

      <div className="other-players">
        <h2 className="header">Other Players</h2>
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