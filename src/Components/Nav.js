import React,{useState,useEffect}from 'react'; 
import {withRouter} from 'react-router-dom'; 
import axios from 'axios'; 
import{connect} from 'react-redux'; 
import{resetProfile} from './Ducks/userReducer'; 
import{getProPosts} from './Ducks/postsDisplayReducer'; 
import swal from 'sweetalert2'; 
// import useCheckLogin from './useCheckLogin'; 


const Nav = (props) => { 


    const[dropdown, setDropdown] = useState(false); 

    const authSelect =() => {
        props.history.push('/auth') 
        setDropdown(!dropdown)
    }
    const addSelect = () => { 
        props.history.push('/new')
        setDropdown(!dropdown)
    }
    const logoutSelect = () => { 
        axios.get('/auth/check').then(res => { 
            if(!res.data ){
                swal.fire({
                    title: 'Error',
                    text: 'No One is Logged In', 
                    icon:'error',
                    confirmButtonText: 'OK'
                })
            }
            else { 
                axios.post('/auth/logout').then(res =>                 
                    swal.fire({
                    title: 'Success',
                    text: 'You Have Logged Out', 
                    icon:'Success',
                    confirmButtonText: 'OK'
                }), props.resetProfile())
            }
        })
        setDropdown(!dropdown)
    }
    const profileSelect = () =>{ 
        props.getProPosts();
        props.history.push('/user')
        setDropdown(!dropdown)
    }

    
    useEffect(()=> console.log(''),[props.profile])
    return(
    <div className  = 'top-container'>  
        <div className = 'Nav'> 
            {/* <img src = '' alt = '' onClick = {()=> props.history.push('/user')}/> */}
            {props.profile.username ? (<h2 className = 'nav-title'>Welcome {props.profile.username} </h2>): 
            (<h2 className = 'nav-title' >Welcome To Dirtgear</h2>)}
            
            <div onClick = {() => props.history.push('/')}>Home</div>
            <div onClick = {() => setDropdown(!dropdown)}>Menu</div>
        </div>
                    {dropdown ? (
                        <div className = 'menu'> 
                            <span className='menu-button' onClick = {authSelect}>Login/Register</span>
                            <span className='menu-button' onClick = {profileSelect}>Profile</span>
                            <span className='menu-button' onClick = {addSelect}>Add Post</span>
                            <span className='menu-button' onClick = {logoutSelect}>Logout</span>
                        </div>
                    ): null }
     </div>  
    )
}

function mapStateToProps(state){
    return{profile: state.userReducer.profile,
        posts: state.postsDisplayReducer.posts
    }
}

export default connect(mapStateToProps,{resetProfile, getProPosts})(withRouter(Nav)); 