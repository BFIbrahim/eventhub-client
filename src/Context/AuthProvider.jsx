import React, { useEffect, useState } from 'react';
import { Authcontext } from './Authcontext';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';


const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)



    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)

    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            console.log('User found', currentUser)
            setLoading(false)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    const authinfo = {
        user,
        loading,
        createUser
    }

    return (
        <Authcontext.Provider value={authinfo}>
            {children}
        </Authcontext.Provider>

    );
};

export default AuthProvider;