import React, {useState, useEffect} from 'react'; 
import {withRouter} from 'react-router-dom'; 

const Post = (props) => { 
    let [imgToggle, setImg] = useState(0); 
    let [displayedImg, setDisplayed] = useState(props.info.photo_1)



    const nextImg = () => { 
        if(imgToggle === 2){ 
            setImg(0)
        }
        else{ 
            setImg(++imgToggle)
        }
        console.log(imgToggle)
    }

    const previousImg = () => { 
        if(imgToggle === 0){ 
            setImg(2)
        }
        else{ 
            setImg(--imgToggle)
        }
    }

    useEffect(() => {
    if(imgToggle === 0){
        setDisplayed(props.info.photo_1)
    }
    else if(imgToggle === 1 ){
        setDisplayed(props.info.photo_2)
    }
    else if(imgToggle === 2){ 
        setDisplayed(props.info.photo_3)
    }
    },[imgToggle])


  
    return(
        <div className = 'post' onClick = {() => props.history.push(`/post/${props.info.post_id}`)}>
            <h2 className= 'post-title'>{props.info.make} {props.info.model} </h2> 
            <p>${props.info.price} /day</p>
            <div className = 'post-pics'>
                <p onClick = {previousImg}>{'<'}</p> 
                <img src = {displayedImg} alt= '' />
                <p onClick = {nextImg} >{'>'}</p>
            </div>
            <p>{props.info.location}</p>
            
        </div>
    )
}

export default withRouter(Post); 