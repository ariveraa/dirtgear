import axios from 'axios'; 

const initialState = {
    profile:{ 
        username: '',
        phoneNumber:'',
        profilePic: ''
    }
}

const GET_PROFILE = 'GET_PROFILE'; 
export function getProfile(){ 
    const profile = axios.get('/auth/check').then(res => res.data).catch(err => err.message)
    console.log(profile)
    return{
        type: GET_PROFILE, 
        payload: profile
    }
}

export default function(state = initialState, action){ 
    const{type,payload} = action;

    switch(type){ 
        case GET_PROFILE + '_PENDING': 
        return {...state, loading: true}
    case GET_PROFILE + '_FULFILLED': 
        return {...state, loading: false, profile:payload}
    case GET_PROFILE + '_REJECTED': 
        return{...state, loading: false}
   
    default: 
        return state
    }
}