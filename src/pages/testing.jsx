import React, { useState, useEffect } from 'react';
import Loading from 'components/Loading/loading';

export default function MainPage() {
  const [count, setCount] = useState(0);
  const [email, setEmail] = useState('');

  const [number, setNumber] = useState(1);

  const [imageName, setImageName] = useState('');

  useEffect( () => {
    document.title = "MohiTheFish"
    async function fetchData() {
        
      const response = await fetch("https://cors-anywhere.herokuapp.com/https://randomfox.ca/floof/?ref=apilist.fun", 
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      }).then(res => res.json())
      .then(res => {
        setImageName(res.image);
      });
      return response;
    }
    fetchData();
  }, [])

  const handleChange = (e) => {
    setEmail(e.target.value);
  }
  return (
    <div>
      This page is being used to test new features.
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count+1)}>
          Click me
        </button>
      </div>
      <div>
        <input type='text' value={email} onChange={handleChange} />
      </div>
      <div>
        <h1>Pick a movie</h1>
        <select value={number} onChange={e => setNumber(e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      </div>

      { imageName === '' ? <Loading /> : <img src={imageName} alt="A fox" />}
    </div>
  );
}