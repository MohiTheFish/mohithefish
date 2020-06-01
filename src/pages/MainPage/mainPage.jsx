import React from 'react';
import Loading from 'components/Loading/loading';

import './mainPage.scss';

export default function MainPage() {
  return (
    <div className="main-page-wrapper">
      <div className="intro">
        <h1>Muhammed Imran</h1>
        <h2>MohiTheFish</h2>
        <Loading />
      </div>
    </div>
  )
}