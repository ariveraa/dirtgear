import React, {useState,useEffect} from 'react'; 
import axios from 'axios' ; 
import{connect} from 'react-redux'; 
import{getProPosts} from './Ducks/postsDisplayReducer'; 

import Post from './Post'; 

const UserProfile = (props) => { 


    const loginCheck = () => {
        props.history.push('/')
        alert('Please Login')
    }



    useEffect(() =>{props.profile.username ? console.log('logged in')  :  loginCheck()
},[])
    
    // console.log(props.posts)
    return(
        <div> 
            <div className = 'profile-info'> 
            <h3>{props.profile.username}</h3>
            <img src = {props.profile.profilePic} alt = 'profile pic'/>
            </div>
            
            <div className = 'profile-posts'>
            { props.posts.map(element =>{ 
                return(
                    
                    <div className = 'pro-posts'>
                        <Post  
                            key = {element.post_id}
                            info = {element}
                        />


                    </div>
                )
            })}
            </div>

        </div>
    )
}

function mapStateToProps(state){ 
    return{profile:state.userReducer.profile, 
        posts: state.postsDisplayReducer.posts, 
        post: state.postReducer.post, 
        id: state.postReducer.id
    }
  
}

export default connect(mapStateToProps, null ) (UserProfile); 