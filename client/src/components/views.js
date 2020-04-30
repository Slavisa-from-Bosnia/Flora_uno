import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Buyers from '../components/buyers/Buyers';
// import SignUp from './orders';
// import Roses from '../components/roses/EditRose';
// import Orders from '../components/orders/EditOrders';


const Views = () => (
    <Switch>
        <Route exact path ="/" component = {Buyers} />
        <Route path ="/buyers" component = {Buyers} />
        {/* <Route path = "/rouses" component = {Rouses}/> */}
        {/* <Route path = "/orders" component = {Orders}/> */}
    </Switch>
);
 
export default Views;