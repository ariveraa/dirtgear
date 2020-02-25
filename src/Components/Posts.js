import React, {useEffect} from 'react'; 
import {connect} from 'react-redux'; 
import {getAllPost,searchPosts} from './Ducks/postsDisplayReducer';
import Post from './Post.js'; 
import {useInputValue} from './useInputValue'; 

const Posts = (props) => { 

    const search = useInputValue(''); 

    useEffect(()=> {props.getAllPost()},[])
 

    const searchPosts = (search) => { 
        props.searchPosts(search)
        console.log(props.posts)
    } 

    const reset = () => { 
        props.getAllPost()
    }

    return(
        <div className = 'posts'> 
            <div className = 'search-bar'>
                <input className = 'search-input' placeholder = 'Enter Make, Model, or Username' {...search} />
                <button className = 'search-button' onClick  = {() => searchPosts(search) }>Search</button> 
                <button className='search-button' onClick = {reset}>Clear</button>
            </div>

            {props.posts && props.posts.map(element =>{ 
        
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

export default connect(mapStateToProps, {getAllPost, searchPosts})(Posts); 