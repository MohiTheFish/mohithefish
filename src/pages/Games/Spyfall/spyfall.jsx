import React from 'react';
// import io from 'socket.io-client';
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

const names = [
  "Abefsefsefsfesef;isoefjsoiefsjfoec", 
  "BCD",
  "CDFE",
  "EFE",
  "loejofjeeojfoso"
];

export default class Spyfall extends React.Component {
  constructor(props) {
    super(props);


    /* Best way to keep track of the name after refreshing??? */
    if(props.location.state) {
      localStorage.setItem('username', props.location.state.username);
      localStorage.setItem('gameName', props.location.state.gameName);
    }
    this.myName = localStorage.getItem('username');
    this.gameName = localStorage.getItem('gameName');

    this.state = {
      selectedLocations: new Set(),
      selectedNames: new Set(),
      isSpy: true,
    }

    /** Event Handlers */
    this.select = this.select.bind(this);
    this.deselect = this.deselect.bind(this);

    this.selectName = this.selectName.bind(this);
    this.deselectName = this.deselectName.bind(this);

    /** Render functions */
    this.renderNames = this.renderNames.bind(this);
    this.renderLocations = this.renderLocations.bind(this);
  }

  // componentDidMount() {
  //   document.title = "Spyfall";
  // }

  componentDidMount() {
    document.title = "Spyfall";
  }

  selectName(e) {
    const { selectedNames } = this.state;
    selectedNames.add(e.target.innerHTML);
    this.setState({
      selectedNames,
    });
  }

  deselectName(e) {
    const { selectedNames } = this.state;
    selectedNames.delete(e.target.innerHTML);
    this.setState({
      selectedNames,
    });
  }

  select(e) {
    const { selectedLocations } = this.state;
    selectedLocations.add(e.target.textContent);
    
    this.setState({
      selectedLocations
    });
  }

  deselect(e) {
    const { selectedLocations } = this.state;
    selectedLocations.delete(e.target.textContent);

    this.setState({
      selectedLocations
    });
  }


  renderNames() {
    const { selectedNames } = this.state;
    return names.map(name => {
      const isSelected = selectedNames.has(name);
      let callback = this.selectName;
      let selectClass = "";
      if (isSelected) {
        callback = this.deselectName;
        selectClass = "selected";
      }
      
      return (
        <h4 key={name}
         className={selectClass}
         onClick={callback}>
          {name}
        </h4>
      )
    })
  }

  renderLocations() {
    const { selectedLocations } = this.state; 
    return locations.map(value => {
      const isSelected = selectedLocations.has(value);
      let callback = this.select;
      let selectClass = "";
      if (isSelected) {
        callback = this.deselect;
        selectClass = "selected";
      }

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

  render () {
    return (
      <div className="wrapper spyfall-page-wrapper">
        <div className="header-text">
          <h1>Play Spyfall</h1>
          <h4>Your name is: {this.myName}</h4>
          <h4>
            {
              this.state.isSpy 
              ? "You ARE the spy! 🕵️" 
              : "You are NOT the spy."
            }
          </h4>
        </div>

        <div className="other-players">
          <h2 className="header">Other Players</h2>
          <div className="names">
            {
              this.renderNames()
            }
          </div>
        </div>

        <div className="location-section">
          <h2 className="header">Locations</h2>
          <div className="location-wrapper">
            {
              this.renderLocations()
            }
          </div>
        </div>
      </div>
    );
  }
}