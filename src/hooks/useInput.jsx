import React, { useState } from 'react';

function useInput (initialValue) {
    const [state, setState] = useState(initialValue);

    function onChangHandler(value) {
        setState(value);
    }

    return [
        state,
        onChangHandler
    ];
}

export default useInput;
