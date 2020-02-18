import React, {useEffect} from 'react'; 
import {connect} from 'react-redux'; 
import {getAllPost} from './Ducks/postsDisplayReducer';
import Post from './Post.js'; 

const Posts = (props) => { 

    useEffect(()=> {props.getAllPost()},[])
 
    return(
        <div> 
            {props.posts.map(element =>{ 
               
                return(
                    <Post  
                        info = {element}
                        key = {element.post_id}
                    />
                )
            })}
        </div>
    )
}

function mapStateToProps(state){ 
    return{posts:state.postsDisplayReducer.posts}
  
}

export default connect(mapStateToProps, {getAllPost})(Posts); 