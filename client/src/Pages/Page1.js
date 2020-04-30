import React from 'react';
import {Switch, Route} from 'react-router-dom';
import SignIn from '../components/signIn/SignIn';
import SignUp from '../components/signUp/SignUp';
import Dashboard from '../components/dashboard/Dashboard';

const Page1 = () => (
    <Switch>
        <Route exact path ="/" component = {SignIn}/>
        <Route path ="/dashboard" component = {Dashboard}/>
        <Route path ="/signup" component = {SignUp}/>
        <Route/>
    </Switch>
)
 
export default Page1;