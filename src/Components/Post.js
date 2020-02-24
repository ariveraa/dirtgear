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
        <div className = 'post'>
            <div className = 'dash-post-info' 
            onClick = {() => props.history.push(`/post/${props.info.post_id}`)}>
                <h2 className= 'post-title'>{props.info.make} {props.info.model} </h2> 
                <p>Machine Hours:  {props.info.hours}</p>
                <p>${props.info.price} /day</p>
                
            </div>
            
            <div className = 'dashboard-post-pics'>
                <p className = 'pic-arrows' onClick = {previousImg}>{'<'}</p> 
                <img className = 'dashboard-post-img' src = {displayedImg} alt= '' />
                <p className = 'pic-arrows' onClick = {nextImg} >{'>'}</p>
            </div>
            
        </div>
    )
}

export default withRouter(Post); 