import React, {useState} from 'react'; 
import axios from 'axios'; 
import{connect} from 'react-redux'; 
import{setProfile} from './Ducks/userReducer'; 

const Auth = (props) => { 
    const[usernameInput, setUsernameInput] = useState(''); 
    const[passwordInput, setPasswordInput] = useState(''); 
    const[phoneNumber, setPhoneNumber] = useState(''); 
    const[registration, setReg] = useState(false); 
    // const [user] = useCheckLogin(); 
    

    const login = () => { 
        // if(!user){ 
        //     alert(`${user.username} is logged in please logout to login into another user`)
        //     props.history.push('/')
        // }
        axios.post('/auth/login', {username: usernameInput, password: passwordInput})
        .then(res => {console.log('your logged in')
         props.setProfile(res.data) 
        props.history.push('/')})
        .catch(err => console.log(err))
        
        
    }

    const register = () => { 
        axios.post('/auth/register', {username: usernameInput, password: passwordInput, phoneNumber: phoneNumber})
        .then(res => {console.log('you have registered')
        props.setProfile()
        props.history.push('/')})
        .catch(err => console.log(err))
    }


    return(
        <div className = 'auth'> 
            <div className = 'auth-box'>
                {registration? (<h2 className = 'auth-title'>REGISTRATION</h2>):
                (<h2 className = 'auth-title'>LOGIN</h2>)}
                <div className= 'auth-input'>
                    <p className= 'auth-p'>Username: </p>
                    <input className = 'input-box'
                        placeholder = 'Enter Username'
                        value = {usernameInput} 
                        onChange = {(e) => setUsernameInput(e.target.value)}
                    /> 
                </div>
                <div className = 'auth-input'>
                    <p className= 'auth-p'>Password: </p>
                    <input className = 'input-box'
                    placeholder = 'Enter Password'
                    value = {passwordInput}
                    onChange = {(e) => setPasswordInput(e.target.value)}
                    />
                </div>
                {registration? (
                <div> 
                    <p>PhoneNumber:</p>
                    <input 
                        placeholder = 'Enter Phone Number' 
                        value = {phoneNumber}
                        onChange = {(e) => setPhoneNumber(e.target.value)}
                    />
                    <button className = 'auth-button' onClick = {register}>Create Profile</button>
                    <button className = 'auth-button' onClick = {() => setReg(!registration)}>Go To Login</button>
                </div>):(
                    <div> 
                        <button className = 'auth-button' onClick = {login}>Login</button>
                        <button className = 'auth-button' onClick = {() => setReg(!registration)}>Registration</button>
                    </div>
                )}
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return{profile: state.userReducer.profile
    }
}

export default connect(mapStateToProps,{setProfile})(Auth); 