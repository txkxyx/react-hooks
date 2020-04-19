import React, { useState } from 'react';

const initialCount = 1;
const initialValue = 1;

const HooksUseState = () => {
    const [ count, setCount ] = useState(initialCount);
    const [ value, setValue ] = useState(initialValue);

    const handleOnClick = () =>{
        setCount(count + 1);
        setValue((value) => value * 2);
    }

    return(
      <>
        <div>
          Count: {count}
        </div>
        <div>
          Value: {value}
        </div>
        <div>
            <button onClick={handleOnClick}>Count</button>
        </div>
      </>
    )
}

export default HooksUseState;