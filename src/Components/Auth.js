import React, {useState} from 'react'; 
import axios from 'axios'; 

const Auth = () => { 
    const[usernameInput, setUsernameInput] = useState(''); 
    const[passwordInput, setPasswordInput] = useState(''); 
    
    const login = () => { 
        axios.post('/auth/login', {username: usernameInput, password: passwordInput})
        .then(res => console.log('your logged in'))
        .catch(err => console.log(err))
    }


    return(
        <div> 
            
            <p>Username: </p>
            <input 
                placeholder = 'Enter Username'
                value = {usernameInput} 
                onchange = {(e) => setUsernameInput(e.target.value)}
            /> 
            <p>Password:</p>
            <input 
            placeholder = 'Enter Password'
            value = {passwordInput}
            onChange = {(e) => setPasswordInput(e.target.value)}
            />
            <button onClick = {login}>Login</button>
            <button>Registration</button>
        </div>
    )
}

export default Auth; 