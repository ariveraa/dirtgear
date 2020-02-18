import React from 'react';
import{Switch, Route} from 'react-router-dom';
import Dashboard from './Components/Dashboard'; 
import Form from './Components/Form'; 
import Auth from './Components/Auth'; 
import IndvPost from './Components/IndvPost'; 
import UserProfile from './Components/UserProfile'; 


export default(
    <Switch>
        <Route exact path = '/' component ={Dashboard} />
        <Route path = '/auth' component = {Auth} />
        <Route path  ='/new' component = {Form} />
        <Route path = '/post/:id' component = {IndvPost} />
        <Route path = '/user' component = {UserProfile} />
    </Switch>
)