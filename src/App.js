import React from 'react';
import { BrowserRouter, Route, Link, useRouteMatch} from 'react-router-dom';
import MainPage from './pages/mainpage';

import './App.css';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Route exact path="/">
        <MainPage />
      </Route>

      <Route path="/hi">
        <div>
          HELLOW WORLDlihsfuoipsagh sopgiopuesgh go
        </div>
      </Route>
    </BrowserRouter>
  );
}

export default App;
