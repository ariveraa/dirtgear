import React, {useState, useEffect} from 'react'; 
import {connect} from 'react-redux'; 
import axios from 'axios'; 
import{getMake, getModel, getHours, getPrice, getDescription, 
    getLocation,getPhoto1,getPhoto2,getPhoto3, setEdit, getAvailability, getId} from './Ducks/postReducer'; 
import{getProPosts} from './Ducks/postsDisplayReducer'; 
import swal from 'sweetalert2'; 


const IndvPosts = (props) => { 
    
    let [postInfo, setInfo] = useState([]);

    useEffect(() => { axios.get(`/api/post/${+props.match.params.id}`).then(
        res=> {let from = res.data.aval_from.split('').splice(5,5).join(''); 
        let to = res.data.aval_to.split('').splice(5,5).join(''); 
        setInfo({...res.data, aval_from: from, aval_to: to})}
    )
    .catch(err => err.message)

       
    }, [])

    const handleEdit = (post_id,make, model, hours, price, description, avail_from, avail_to, photo1,photo2, photo3) => { 
        props.getId(post_id)
        props.getModel(model)
        props.getMake(make)
        props.getHours(hours)
        props.getPrice(price)
        props.getDescription(description)
        // props.getAvailability({from:avail_from, to: avail_to})
        props.getPhoto1(photo1)
        props.getPhoto2(photo2)
        props.getPhoto3(photo3)
        props.setEdit()
        props.history.push('/new')
    }

    const handleDelete = (post_id) => { 
        axios.delete(`/api/post/${post_id}`).then(res => 
            swal.fire({
            title: 'Deleted',
            text: 'Post Successfully Deleted', 
            icon:'success',
            confirmButtonText: 'OK'
        }))
        props.getProPosts()
        props.history.push('/user')
    }

    
    

   
    const {post_id,make,model,username, phone_number, profile_pic, price, photo_1,photo_2,photo_3,hours, description, aval_from, aval_to} = postInfo
    // console.log(props.profile)
    return(
        <div className = 'individual-post'>
            <div className = 'post-header'> 
                <h3>{make} {model}</h3>
                <p>Posted By: {username}</p>
                <p>Contact: {phone_number} </p>
                <img src = {profile_pic} alt = '' />
            </div>
            <p>${price} /day</p>
            <p>Available From: {aval_from} To: {aval_to}</p>
            <div className = 'post-pics-box'>
                <img className = 'post-pics' src = {photo_1} alt = ''/>
                <img className = 'post-pics' src = {photo_2} alt = ''/>
                <img className = 'post-pics' src = {photo_3} alt = ''/>
            </div>
            <p>Machine Hours:{hours}hrs</p>
            <p>Description: {description}</p>
            
            {props.profile.username? (                        
                <div className = 'profile-post-button-box'>
                    <button className = 'profile-buttons' 
                        onClick = {() => handleEdit(post_id,make,model, hours,price, description, aval_from, aval_to, photo_1,photo_2,photo_3)}>
                        Edit
                    </button>
                    <button className = 'profile-buttons' 
                    onClick = {() => handleDelete(post_id)}>
                                Delete
                    </button>
                </div>): null}
            
        </div>
    )
} 

function mapStateToProps(state){ 
    return{posts:state.postsDisplayReducer.posts, 
        profile:state.userReducer.profile
    }
  
}

export default connect(mapStateToProps, { getMake, getModel, getHours,getPrice, getDescription,getAvailability, getLocation, getPhoto1,getPhoto2,getPhoto3, setEdit, getId, getProPosts})(IndvPosts); 

