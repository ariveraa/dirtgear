import React,{useState}from 'react'; 
import {withRouter} from 'react-router-dom'; 

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

    return(
    <div>  
        <div className = 'Nav'> 
            <img src = '' alt = '' onClick = {()=> props.history.push('/user')}/>
            <h2>Welcome ???</h2>
            <div onClick = {() => props.history.push('/dashboard')}>Home</div>
            <div onClick = {() => setDropdown(!dropdown)}>Menu</div>
        </div>
                    {dropdown ? (
                        <div className = 'menu'> 
                            <span onClick = {authSelect}>Login/Register</span>
                            <span >Profile</span>
                            <span onClick = {addSelect}>Add Post</span>
                            <span>About</span>
                        </div>
                    ): null }
     </div>  
    )
}

export default withRouter(Nav); 