/**
 * @author Muhammed Imran (Mohithefish)
 * @description Holds some constants used in the application to decrease individual file sizes.
 */

import FlightSimulator from 'pages/flightsim_temp';
import AboutPage from 'pages/About';
import StringAlignment from 'Projects/StringAlignment';
import ScreenTime from 'Projects/ScreenTime/screenTime';

import flightSimImg from 'assets/images/flightsim.png';


const FLIGHTSIM_ENDPOINT = '/flight-sim';
const STRINGALIGNMENT_ENDPOINT = '/string-alignment';
const SCREENTIME_ENDPOINT = '/screentime';


export const aboutRoutes = [
  {
    exact: true,
    path: '/',
    component: AboutPage,
  },
  {
    exact: false,
    path: FLIGHTSIM_ENDPOINT,
    component: FlightSimulator,
  },
  {
    exact: false,
    path: STRINGALIGNMENT_ENDPOINT,
    component: StringAlignment,
  },
  {
    exact: false,
    path: SCREENTIME_ENDPOINT,
    component: ScreenTime,
  }
];

export const projectCards = [
  {
    to: FLIGHTSIM_ENDPOINT,
    title: "Flight Simulator",
    image: flightSimImg,
    alt: "A flight simulator game",
    details: "This was an exercise in terrain generation and camera transformation as part of my computer graphics course at UIUC."
  },
  {
    to: STRINGALIGNMENT_ENDPOINT, 
    title: "String Alignment",
    image: undefined,
    alt: '',
    details: "This is a project to explain string alignment and align strings on demand."
  },
  {
    to: SCREENTIME_ENDPOINT,
    title: "Screen Time",
    image: undefined,
    alt: '',
    details: "This is just a representation of how I waste my time regularly."
  }
];