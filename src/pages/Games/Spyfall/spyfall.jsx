import React from 'react';
import io from 'socket.io-client';
import Button from '@material-ui/core/Button';

import './spyfall.scss';

const locations = [
  'Desert',
  'Swamp',
  'Forest',
  'City',
  'Boat'
];



function renderLocations(selected) {
  return locations.map(value => {
    const isSelected = selected.has(value);
    let callback = this.select;
    let selectClass = "unselected";
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

export default class Spyfall extends React.Component {
  constructor(props) {
    super(props);


    /* Best way to keep track of the name after refreshing??? */
    if(props.location.state) {
      localStorage.setItem('username', props.location.state.username)
    }
    this.myName = localStorage.getItem('username');

    this.state = {
      selected: new Set()
    }

    /** Event Handlers */
    this.select = this.select.bind(this);
    this.deselect = this.deselect.bind(this);

    /** Render functions */
    this.renderLocations = this.renderLocations.bind(this);
  }

  componentDidMount() {
    document.title = "Spyfall";
  }

  // componentDidMount() {
  //   const socket = io('http://localhost:5000', {
  //     reconnection: false,
  //   });

  //   socket.on('connect', function(){
  //     console.log('THe client connected');
  //   });

  //   socket.on('my response', function(data){
  //     console.log(data);
  //   });
  // }

  select(e) {
    const { selected } = this.state;
    selected.add(e.target.textContent);
    console.log(selected);
    this.setState({
      selected
    });
  }

  deselect(e) {
    const { selected } = this.state;
    selected.delete(e.target.textContent);
    console.log(selected);

    this.setState({
      selected
    });
  }

  renderLocations() {
    const { selected } = this.state; 
    return locations.map(value => {
      const isSelected = selected.has(value);
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
      <div className="spyfall-page-wrapper">
        <div className="header-text">
          <h1>Play Spyfall</h1>
          <h4>Your name is: {this.myName}</h4>
        </div>

        <div className="other-players">
          <h2> Other players</h2>
        </div>

        <div className="location-wrapper">
          {
            this.renderLocations()
          }
        </div>
      </div>
    );
  }
}