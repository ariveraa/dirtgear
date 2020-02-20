import {useState} from 'react'; 
import axios from 'axios'; 

const useCheckLogin  = () =>  { 
    let [loggedInUser, setUser] = useState('')
    axios.get('/auth/check').then(res => setUser(res.data)).catch(err => err.message)
   return [loggedInUser]; 
}

export default useCheckLogin; 