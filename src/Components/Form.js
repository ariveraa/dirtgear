import React, {useState,useEffect} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import Calendar from './Calendar'; 
import {connect} from 'react-redux';
import{getMake, getModel, getHours, getPrice, getDescription, 
    getLocation,getPhoto1,getPhoto2,getPhoto3, setEdit, reset} from './Ducks/postReducer';  
import {v4 as randomString} from 'uuid'; 
import Dropzone from 'react-dropzone'; 
import noImage from '../noImage.png';
import swal from 'sweetalert2'; 

// import { S3 } from 'aws-sdk';




 
const Form = (props)  => { 

    const[isUploading, setUploading] = useState(false); 


    useEffect(() =>{ 
        axios.get('/auth/check').then(res => { 
            if(!res.data ){
                props.history.push('/auth')
                swal.fire({
                    title: 'Error!',
                    text: 'Log In To Create A Post', 
                    icon:'error',
                    confirmButtonText: 'OK'
                })
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
            swal.fire({
                title: 'Error!',
                text: 'Photo Not Uploaded', 
                icon:'error',
                confirmButtonText: 'OK'
            })
            // alert(err);
            if(err.response.status === 403){ 
                console.log(`Your request for a signed URL failed with a status 403.`); 
            }
            else {
                console.log(`ERROR: ${err.status}\n ${err.stack}`);
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

    const editPost = (id,make,model, hours, description, location, from, to, photo1, photo2,photo3) => { 
        axios.put(`/api/post/${id}`,{make,model, hours,price, description, location, from, to, photo1, photo2,photo3 })
        .then(res => {props.history.push('/'); props.reset() } )
    }

    const {make, model, hours, price, description, location, availability, photo1, photo2,photo3} = props.post

    
    // console.log(props.id)
        return(
            
            <div className = 'form'>
                <h4 className = 'form-title'>CREATE A NEW POST</h4>
                <div className = 'make-model' >
                    <div className = 'form-inputs' > 
                        <p>Make:</p>
                        <input className = 'entry-box'
                            placeholder = 'Enter Make'
                            value = {make}
                            onChange = {(e) => props.getMake(e.target.value)}
                        />
                    </div>
                    <div className = 'form-inputs' > 
                        <p>Model:</p>
                        <input className = 'entry-box'
                            placeholder = 'Enter Model'
                            value = {model}
                            onChange = {(e) => props.getModel(e.target.value)}
                        />
                    </div>
                </div>

                <div className = 'hours-price'> 
                    <div className = 'form-inputs' > 
                        <p>Hours:</p>
                        <input className = 'entry-box'
                            placeholder = 'Enter Hours'
                            value = {hours}
                            onChange = {(e) => props.getHours(e.target.value)}
                        />
                    </div> 
                    <div className = 'form-inputs' > 
                        <p>Price /day:</p>
                        <input className = 'entry-box'
                            placeholder = 'Enter price' 
                            value = {price}
                            onChange = {(e) => props.getPrice(e.target.value)}
                        /> 
                    </div> 
                </div>

                <div className = 'description-form-input' > 
                    <p>Description:</p>
                    <textarea className = 'description-entry-box'
                        placeholder = 'Enter Description' 
                        value = {description}
                        onChange = {(e) => props.getDescription(e.target.value)}
                    /> 
                </div> 
                {/* use google maps to get location here */}
               

                <Calendar />
                <div className = 'create-post-pics'>
                    <div className = 'pic-box' > 
                        {!photo1? (<img className= 'upload-preview' src = {noImage} />) : (<img className= 'upload-preview'  src ={photo1} alt = ''/>)  }
                        
                        
                        <Dropzone onDropAccepted = {(file) => getSignedRequest(file, 'photo1')} accept = 'image/*' multiple= {false} >
                            {({getRootProps, getInputProps}) => (
                                <div  {...getRootProps()}>
                                    <input {...getInputProps()} />
                                {isUploading ? <span>Loading...</span> : <span className = 'dropzone'>Click Here to Upload Picture</span>}
                                </div>
                            )}
                        </Dropzone>
                    <button className = 'remove-picture' onClick = {() => removePhoto(photo1)}>Remove Picture</button>
                    </div>
                    <div className = 'pic-box' > 
                    {!photo2? (<img className= 'upload-preview' src = {noImage} />) : (<img className= 'upload-preview'  src ={photo2} alt = ''/>)}
                    <Dropzone onDropAccepted = {(file) => getSignedRequest(file, 'photo2')} accept = 'image/*' multiple= {false}>
                        {({getRootProps, getInputProps}) => (
                            <div  {...getRootProps()}>
                                <input {...getInputProps()} />
                            {isUploading ? <span>Loading...</span> : <span className = 'dropzone' >Click Here to Upload Picture</span>}
                            </div>
                        )}
                    </Dropzone>
                    <button className = 'remove-picture' onClick = {() => removePhoto(photo2)}>Remove Picture</button>
                    </div>
                    <div className = 'pic-box' > 
                    {!photo3? (<img className= 'upload-preview' src = {noImage} />) : (<img className= 'upload-preview'  src ={photo3} alt = ''/>)}
                    <Dropzone onDropAccepted = {(file) => getSignedRequest(file, 'photo3')} accept = 'image/*' multiple= {false}>
                        {({getRootProps, getInputProps}) => (
                            <div  {...getRootProps()}>
                                <input {...getInputProps()} />
                            {isUploading ? <span>Loading...</span> : <span className = 'dropzone' >Click Here to Upload Picture</span>}
                            </div>
                        )}
                    </Dropzone>
                    <button className = 'remove-picture' onClick = {() => removePhoto(photo3)}>Remove Picture</button>
                    </div>
                </div>

               {props.edit ? <button className= 'submit-button' onClick = {() => editPost(props.id, make,model, hours, description,location,availability.from, availability.to,photo1, photo2, photo3)}>Make Changes</button> : 
               <button className= 'submit-button' onClick ={() => addPost(make,model, hours, description,location,availability.from, availability.to,photo1, photo2, photo3)}>Post</button>}
            </div>
        )
    
}

function mapStateToProps(state){ 
    return{post:state.postReducer.post, 
        edit: state.postReducer.edit, 
        id: state.postReducer.id
    }
  
}

export default connect(mapStateToProps, {getMake, getModel, getHours,getPrice, getDescription, getLocation, getPhoto1,getPhoto2,getPhoto3,setEdit, reset})(withRouter(Form));