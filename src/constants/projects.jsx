import FlightSimulator from 'pages/flightsim_temp';
import AboutPage from 'pages/About';
import StringAlignment from 'Projects/StringAlignment';

import flightSimImg from 'assets/images/flightsim.png';


export const aboutRoutes = [
  {
    exact: true,
    path: '/',
    component: AboutPage,
  },
  {
    exact: false,
    path: '/flight-sim',
    component: FlightSimulator,
  },
  {
    exact: false,
    path: '/string-alignment',
    component: StringAlignment,
  }
];

export const projectCards = [
  {
    to: '/flight-sim',
    title: "Flight Simulator",
    image: flightSimImg,
    alt: "A flight simulator game",
    details: "This was an exercise in terrain generation and camera transformation as part of my computer graphics course at UIUC."
  },
  {
    to: '/string-alignment', 
    title: "String Alignment",
    image: undefined,
    alt: '',
    details: "This is a project to explain string alignment and align strings on demand."
  }
];