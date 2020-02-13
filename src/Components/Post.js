import React from 'react'; 
import {withRouter} from 'react-router-dom'; 

const Post = (props) => { 

    return(
        <div className = 'post' onClick = {() => props.history.push(`/post/${props.info.id}`)}>
            <h2 className= 'post-title'>{props.info.make} {props.info.model} </h2> 
            {/* add imgs here */}
            <p>{props.info.location}</p>
            
        </div>
    )
}

export default Post; 