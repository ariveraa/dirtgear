import React,{useState}from 'react'; 
import {withRouter} from 'react-router-dom'; 
import axios from 'axios'; 
import{connect} from 'react-redux'; 


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
            if(res.data === 'please login'){
                alert('No one is logged in')
            }
            else { 
                axios.post('/auth/logout').then(res => alert('You have logged out'))
            }
        })
    }
    const profileSelect = () =>{ 
        props.history.push('/user')
        setDropdown(!dropdown)
    }
    
    return(
    <div className  = 'top-container'>  
        <div className = 'Nav'> 
            <img src = '' alt = '' onClick = {()=> props.history.push('/user')}/>
            {props.profile.username ? (<h2>Welcome {props.profile.username} </h2>): 
            (<h2>Welcome To Dirtgear</h2>)}
            
            <div onClick = {() => props.history.push('/')}>Home</div>
            <div onClick = {() => setDropdown(!dropdown)}>Menu</div>
        </div>
                    {dropdown ? (
                        <div className = 'menu'> 
                            <span onClick = {authSelect}>Login/Register</span>
                            <span onClick = {profileSelect}>Profile</span>
                            <span onClick = {addSelect}>Add Post</span>
                            <span>About</span>
                            <span onClick = {logoutSelect}>Logout</span>
                        </div>
                    ): null }
     </div>  
    )
}

function mapStateToProps(state){
    return{profile: state.userReducer.profile}
}

export default connect(mapStateToProps)(withRouter(Nav)); 