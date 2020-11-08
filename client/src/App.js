import React, {Fragment} from 'react';
import './App.css';
import Page1 from './Pages/Page1';
import SignInContextProvider from './context/auth-context';


function App() {
  return (
    <Fragment>
      <SignInContextProvider>
        <Page1/>
      </SignInContextProvider>
          

    </Fragment>
    
 
  );
}

export default App;
