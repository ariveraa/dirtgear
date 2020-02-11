import React, {useState} from 'react'; 
import axios from 'axios'; 

const Auth = (props) => { 
    const[usernameInput, setUsernameInput] = useState(''); 
    const[passwordInput, setPasswordInput] = useState(''); 
    const[phoneNumber, setPhoneNumber] = useState(''); 
    const[registration, setReg] = useState(false); 
    
    const login = () => { 
        axios.post('/auth/login', {username: usernameInput, password: passwordInput})
        .then(res => console.log('your logged in'),
        props.history.push('/Dashboard'))
        .catch(err => console.log(err))
    }

    const register = () => { 
        axios.post('/auth/register', {username: usernameInput, password: passwordInput, phoneNumber: phoneNumber})
        .then(res => console.log('you have registered'),
        props.history.push('/Dashboard'))
        .catch(err => console.log(err))
    }


    return(
        <div> 
            
            <p>Username: </p>
            <input 
                placeholder = 'Enter Username'
                value = {usernameInput} 
                onChange = {(e) => setUsernameInput(e.target.value)}
            /> 
            <p>Password:</p>
            <input 
            placeholder = 'Enter Password'
            value = {passwordInput}
            onChange = {(e) => setPasswordInput(e.target.value)}
            />
            {registration? (
            <div> 
                <p>PhoneNumber:</p>
                <input 
                    placeholder = 'Enter Phone Number' 
                    value = {phoneNumber}
                    onChange = {(e) => setPhoneNumber(e.target.value)}
                />
                <button onClick = {register}>Create Profile</button>
                <button onClick = {() => setReg(!registration)}>Go To Login</button>
            </div>):(
                <div> 
                    <button onClick = {login}>Login</button>
                    <button onClick = {() => setReg(!registration)}>Registration</button>
                </div>
            )}
        </div>
    )
}

export default Auth; 