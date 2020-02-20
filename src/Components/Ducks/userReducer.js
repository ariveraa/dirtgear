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
    return{
        type: GET_PROFILE, 
        payload: profile
    }
}

const SET_PROFILE = 'SET_PROFILE'; 
export function setProfile(info){ 
    const profile = info; 
    return{ 
        type: SET_PROFILE, 
        payload: profile
    }
}


const RESET_PROFILE = 'RESET_PROFILE'; 
export function resetProfile(){ 
    const profile  = initialState; 
    return { 
        type: RESET_PROFILE, 
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
    case SET_PROFILE: 
        return{...state, profile: payload}
    case RESET_PROFILE:
        return{...state, profile: payload}
   
    default: 
        return state
    }
}