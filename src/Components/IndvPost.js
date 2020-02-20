import React, {useState, useEffect} from 'react'; 
import {connect} from 'react-redux'; 
import axios from 'axios'; 


const IndvPosts = (props) => { 
    
    let [postInfo, setInfo] = useState([]);

    useEffect(() => { axios.get(`/api/post/${+props.match.params.id}`).then(
        res=> {let from = res.data.aval_from.split('').splice(5,5).join(''); 
        let to = res.data.aval_to.split('').splice(5,5).join(''); 
        setInfo({...res.data, aval_from: from, aval_to: to})}
    )
    .catch(err => err.message)

       
    }, [])

    
    

   
    const {make,model,username, phone_number, profile_pic, price, photo1,photo2,photo3,hours, description, aval_from, aval_to} = postInfo
    console.log(postInfo)
    return(
        <div>
            <div className = 'post-header'> 
                <h3>{make} {model}</h3>
                <p>{username}</p>
                <p>Contact: {phone_number} </p>
                <img src = {profile_pic} alt = '' />
            </div>
            <p>${price} /day</p>
            <img src = {photo1} alt = ''/>
            <img src = {photo2} alt = ''/>
            <img src = {photo3} alt = ''/>
            <p>{hours}hrs</p>
            <p>{description}</p>
            <p>Available From: {aval_from} To: {aval_to}</p>
            {/* message creator */}
        </div>
    )
} 

function mapStateToProps(state){ 
    return{posts:state.postsDisplayReducer.posts}
  
}

export default connect(mapStateToProps, null)(IndvPosts); 

