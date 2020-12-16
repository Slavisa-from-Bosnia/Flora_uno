import React, {createContext, useState} from 'react';

export const SignInContext = createContext();

const SignInContextProvider = (props) => {
    const [signInData, setSignInData] = useState({
        token: null,

    });

    const [docker, setDocker] = useState({
        connection: "95.217.217.13"
        // connection: "192.168.99.100"
        // connection: "localhost"
        

    });

    const addData = (newtoken) => {
        setSignInData ({token: newtoken}); 
    };

    return (
        <SignInContext.Provider value={{signInData, addData, docker}}>
            {props.children}
        </SignInContext.Provider>
    );
}

export default SignInContextProvider;