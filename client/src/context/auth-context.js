import React, {createContext, useState} from 'react';

export const SignInContext = createContext();

const SignInContextProvider = (props) => {
    const [signInData, setSignInData] = useState({
        token: null,

    });

    const [docker, setDocker] = useState({
        connection: "134.209.243.97"
        // connection: "178.128.206.192"
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