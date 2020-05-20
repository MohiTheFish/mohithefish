import React, { useState, useEffect } from 'react';

const tempData = ['I', "won't", 'be', 'silenced'];

export default function MainPage() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    console.log(`API effect called. IsLoadingData: ${isLoadingData}`);
    setTimeout(()=> {
      console.log('set isLoading to false')
      setIsLoadingData(false);
      setData(tempData);
    }, 2000);
  }, []);

  console.log(isLoadingData);
  return (
    <div>
      This will be my main page.
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setIsLoadingData(true)}>
          Click me
        </button>
      </div>
      <div>
        Your data is {isLoadingData ? 'NOT LOADED' : 'DONE LOADING'}
        {
          data.map(val =>
            <p key={val}> {val}</p>)
        }
      </div>

    </div>
  );
}