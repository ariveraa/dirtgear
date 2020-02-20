import React, {useState,useEffect} from 'react'; 
import{connect} from 'react-redux'; 
import{getProPosts} from './Ducks/postsDisplayReducer'; 
import Post from './Posts'; 

const UserProfile = (props) => { 


    const loginCheck = () => {
        props.history.push('/')
        alert('Please Login')
    }

    // useEffect(() =>{props.profile.username ? setProPost( props.getProPosts())  :  loginCheck()
    // },[])
    
    console.log(props.posts)
    return(
        <div> 
            <div className = 'profile-info'> 
            <h3>{props.profile.username}</h3>
            <img src = {props.profile.profilePic} alt = 'profile pic'/>
            </div>
            

            {/* {props.posts? <Posts /> : null} */}
            
            { props.posts.map(element =>{ 
                return(
                    <div>
                        <Post  
                            info = {element}
                            key = {element.post_id}
                        />
                        <button>Edit</button>
                    </div>
                )
            })}


        </div>
    )
}

function mapStateToProps(state){ 
    return{profile:state.userReducer.profile, 
        posts: state.postsDisplayReducer.posts
    }
  
}

export default connect(mapStateToProps, {getProPosts} ) (UserProfile); 