import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


export default function Games() {
  const [name, setName] = useState("");
  useEffect ( () => {
    document.title = "Games";
  }, []);

  function handleChange(e) {
    setName(e.target.value);
  }
  return (
    <div>
      <p>This page will be used to navigate between the games I will create. </p>
      <h2>Please select your username before continuing. If your name is empty, a random name will be generated for you.</h2>
      <input value={name} onChange={handleChange}/>
      <Link to={{
        pathname: "/games/spyfall",
        state: {username: name}
      }}>Play Spyfall</Link>
    </div>
  );
}