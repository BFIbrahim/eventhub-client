import React, { useContext } from 'react';
import { Authcontext } from '../Context/Authcontext';

const UseAuth = () => {
    const authInfo = useContext(Authcontext)
    return authInfo
};

export default UseAuth;