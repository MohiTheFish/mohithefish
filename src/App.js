import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MainPage from './pages/mainpage';
import Loading from 'components/loading/loading';
import './App.css';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Route exact path="/" component={MainPage} /> 
      <Route path="/testcomponent" render={Loading} />
    </BrowserRouter>
  );
}

export default App;
