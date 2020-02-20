import React, {useEffect} from 'react'; 
import{connect} from 'react-redux'; 
import{getProPosts} from './Ducks/postsDisplayReducer'; 
import Posts from './Posts'; 

const UserProfile = (props) => { 

    // useEffect((props) => {
    //     props.getProPosts()
    console.log(props.posts)
    return(
        <div> 
            <div className = 'profile-info'> 
            <h3>{props.profile.username}</h3>
            <img src = {props.profile.profilePic} alt = 'profile pic'/>
            </div>
            

            {props.posts? <Posts /> : null}
            
            {/* {!props.posts? null :  (props.posts.map(element =>{ 
                return(
                    <Post  
                        info = {element}
                        key = {element.post_id}
                    />
                )
            }))} */}


        </div>
    )
}

function mapStateToProps(state){ 
    return{profile:state.userReducer.profile, 
        posts: state.postsDisplayReducer.posts
    }
  
}

export default connect(mapStateToProps, {getProPosts} ) (UserProfile); 