import React, {useEffect} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import Calendar from './Calendar'; 
import {connect} from 'react-redux';
import{getMake, getModel, getHours, getPrice, getDescription, getLocation, reset} from './Ducks/postReducer';  


 
const Form = (props)  => { 

    useEffect(() =>{ 
        axios.get('/auth/check').then(res => { 
            if(res.data === 'please login'){
                props.history.push('/auth')
                alert('Log in to create a post')
            }
        })
    },[])

    const addPost = (make,model, hours, description, location, from, to) => { 
        axios.post('/api/post' , {make,model, hours,price, description, location, from, to})
        .then(res => {props.history.push('/'); props.reset() })
        
    }
    const {make, model, hours, price, description, location, availability} = props.post


        return(
            
            <div className = 'Form'>
                <p>Make:</p>
                <input 
                placeholder = 'Enter Make'
                value = {make}
                onChange = {(e) => props.getMake(e.target.value)}
                />
                <p>Model:</p>
                <input 
                placeholder = 'Enter Model'
                value = {model}
                onChange = {(e) => props.getModel(e.target.value)}
                />
                <p>Hours:</p>
                <input 
                placeholder = 'Enter Hours'
                value = {hours}
                onChange = {(e) => props.getHours(e.target.value)}
                />
                <p>Price per day:</p>
                <input 
                placeholder = 'Enter price here' 
                value = {price}
                onChange = {(e) => props.getPrice(e.target.value)}
                /> 
                {/* use amazon s3 to enter pics here */}
                <p>Description:</p>
                <input 
                placeholder = 'Enter Description' 
                value = {description}
                onChange = {(e) => props.getDescription(e.target.value)}
                /> 
                {/* use google maps to get location here */}
                <Calendar />

                <button onClick ={() => addPost(make,model, hours, description,location,availability.from, availability.to)}>post</button>
            </div>
        )
    
}

function mapStateToProps(state){ 
    return{post:state.postReducer.post}
  
}

export default connect(mapStateToProps, {getMake, getModel, getHours,getPrice, getDescription, getLocation, reset})(withRouter(Form));