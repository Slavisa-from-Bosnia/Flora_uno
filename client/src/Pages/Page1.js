import React, {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import SignIn from '../components/signIn/SignIn';
// import SignUp from '../components/signUp/SignUp';
import Dashboard from '../components/dashboard/Dashboard';
import {SignInContext} from '../context/auth-context';

const Page1 = () => {
    const {signInData} = useContext(SignInContext);

    return(
        <Switch>
            <Route exact path ="/" component = {SignIn}/>
            {!signInData.token && <Redirect from ="/dashboard" to="/" />}
            {signInData.token && <Route path ="/dashboard" component = {Dashboard}/>}
            {/* <Route path ="/signup" component = {SignUp}/> */}
            <Route/>
        </Switch>
    );
}
 
export default Page1;