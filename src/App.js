import React, { useState, useEffect } from 'react';

const initialDate = new Date();

const App = () => {
    const [ date, setDate ] = useState(initialDate);

    useEffect(() => {
        const timerId = setInterval(() => {
            setDate(new Date())
        },1000);
        return () => clearInterval(timerId);
    });

    return(
      <div>
          <h2>It is { date.toLocaleTimeString()}</h2>
      </div>
    )
}

export default App;