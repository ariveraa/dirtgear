import React from 'react';
import{Switch, Route} from 'react-router-dom';
import Dashboard from './Components/Dashboard'; 
import Form from './Components/Form'; 
import Auth from './Components/Auth'; 
import Post from './Components/Posts'; 
import UserProfile from './Components/UserProfile'; 


export default(
    <Switch>
        <Route exact path = '/' component ={Dashboard} />
        <Route path = '/auth' component = {Auth} />
        <Route path  ='/new' component = {Form} />
        <Route path = '/post/:id' component = {Post} />
        <Route path = '/user' component = {UserProfile} />
    </Switch>
)