import React, { useEffect } from 'react';

const HooksUseEffect = () => {

    useEffect(() => {
        document.getElementById("effect").textContent = "Hello useEffect";
    });

    return(
        <div>
            <div id="effect"></div>
        </div>
    )
}

export default HooksUseEffect;