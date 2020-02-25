import React, {useEffect} from 'react'; 
import{connect} from 'react-redux'; 
import swal from 'sweetalert2';
import Post from './Post'; 

const UserProfile = (props) => { 


    const loginCheck = () => {
        swal.fire({
            title: 'Error',
            text: 'Please Login', 
            icon:'error',
            confirmButtonText: 'OK'
        })
        props.history.push('/')

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