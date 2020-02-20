import React, {useState,useEffect} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import Calendar from './Calendar'; 
import {connect} from 'react-redux';
import{getMake, getModel, getHours, getPrice, getDescription, 
    getLocation,getPhoto1,getPhoto2,getPhoto3, reset} from './Ducks/postReducer';  
import {v4 as randomString} from 'uuid'; 
import Dropzone from 'react-dropzone'; 
// import { S3 } from 'aws-sdk';




 
const Form = (props)  => { 

    const[isUploading, setUploading] = useState(false); 


    useEffect((props) =>{ 
        axios.get('/auth/check').then(res => { 
            if(res.data === 'please login'){
                props.history.push('/auth')
                alert('Log in to create a post')
            }
        })
    },[]);

    const getSignedRequest = ([file], n) => { 
        
        setUploading(true); 
        const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`; 
        axios.get('/api/signs3', { 
            params: {
                'file-name': fileName, 
                'file-type': file.type
            }
        })
        .then(response => { 
            const {signedRequest,url} = response.data; 
            
            uploadFile(file,signedRequest,url,n); 
        })
        .catch(err => { 
            console.log(err)
        })
    }

    const uploadFile = (file,signedRequest,url, n)  => { 
        const options = { 
            headers: {
                'Content-Type': file.type
            }
        }; 
        axios.put(signedRequest,file,options)
        .then(res => { 
            setUploading(false)
            if(n === 'photo1'){ 
                props.getPhoto1(url); 
            }
            else if(n === 'photo2'){ 
                props.getPhoto2(url); 
            }
            else if(n === 'photo3'){ 
                props.getPhoto3(url); 
            }
        })
        .catch(err => { 
            setUploading(false); 
            alert(err);
            if(err.response.status === 403){ 
                alert(`Your request for a signed URL failed with a status 403.`); 
            }
            else {
                alert(`ERROR: ${err.status}\n ${err.stack}`);
            }
        })
    }

    const removePhoto = (photo) =>{ 
        let key = photo.split('/').slice(-1)[0]; 
        console.log(typeof(key))
        axios.delete(`/api/photo/${key}`).then(res => console.log(res))
        props.getPhoto1('')

    }

    const addPost = (make,model, hours, description, location, from, to, photo1, photo2,photo3) => { 
        axios.post('/api/post' , {make,model, hours,price, description, location, from, to, photo1, photo2,photo3 })
        .then(res => {props.history.push('/'); props.reset() })
        
    }

    const {make, model, hours, price, description, location, availability, photo1, photo2,photo3} = props.post


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
              
                <p>Description:</p>
                <input 
                placeholder = 'Enter Description' 
                value = {description}
                onChange = {(e) => props.getDescription(e.target.value)}
                /> 
                {/* use google maps to get location here */}
                <Calendar />
                <div className = 'post-pics'>
                    <img  src ={photo1} alt = 'upload pic' />
                    <Dropzone onDropAccepted = {(file) => getSignedRequest(file, 'photo1')} accept = 'image/*' multiple= {false} >
                        {({getRootProps, getInputProps}) => (
                            <div  {...getRootProps()}>
                                <input {...getInputProps()} />
                            {isUploading ? <span>Loading...</span> : <span>Upload Picture</span>}
                            </div>
                        )}
                    </Dropzone>
                    <button onClick = {() => removePhoto(photo1)}>remove picture</button>
                    <img src ={photo2} alt = 'upload pic'/>
                    <Dropzone onDropAccepted = {(file) => getSignedRequest(file, 'photo2')} accept = 'image/*' multiple= {false}>
                        {({getRootProps, getInputProps}) => (
                            <div  {...getRootProps()}>
                                <input {...getInputProps()} />
                            {isUploading ? <span>Loading...</span> : <span>Upload Picture</span>}
                            </div>
                        )}
                    </Dropzone>
                    <img src ={photo3} alt = 'upload pic' />
                    <Dropzone onDropAccepted = {(file) => getSignedRequest(file, 'photo3')} accept = 'image/*' multiple= {false}>
                        {({getRootProps, getInputProps}) => (
                            <div  {...getRootProps()}>
                                <input {...getInputProps()} />
                            {isUploading ? <span>Loading...</span> : <span>Upload Picture</span>}
                            </div>
                        )}
                    </Dropzone>
                </div>

                <button onClick ={() => addPost(make,model, hours, description,location,availability.from, availability.to,photo1, photo2, photo3)}>post</button>
            </div>
        )
    
}

function mapStateToProps(state){ 
    return{post:state.postReducer.post}
  
}

export default connect(mapStateToProps, {getMake, getModel, getHours,getPrice, getDescription, getLocation, getPhoto1,getPhoto2,getPhoto3, reset})(withRouter(Form));