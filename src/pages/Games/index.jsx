import React, { useEffect } from 'react';


export default function Games() {
  useEffect ( () => {
    document.title = "Games";

    async function testServer() {
      const response = await (await fetch('http://localhost:5000')).json();
      console.log(response);
    }

    testServer();
  }, []);

  return (
    <div>
      <p>This page will be used to navigate between the games I will create. </p>
      
    </div>
  );
}