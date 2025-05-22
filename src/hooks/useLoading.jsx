import React, { useState } from 'react';

function useLoading () {
    const [state, setState] = useState(false);

    const toggleState = () => setState((prevState) => !prevState);

    return [
        state,
        toggleState
    ];
}

export default useLoading;
