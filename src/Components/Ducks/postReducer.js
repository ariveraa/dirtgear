import axios from 'axios'; 

const initialState ={ 
    post: {
        make: '', 
        model: '', 
        hours: '',
        price: '', 
        description: '', 
        location: '', 
        availability: {from: '', to: ''} 

    }
}

const GET_MAKE ='GET_MAKE'; 
const GET_MODEL ='GET_MODEL'; 
const GET_HOURS ='GET_HOURS'; 
const GET_PRICE = 'GET_PRICE'; 
const GET_DESCRIPTION ='GET_DESCRIPTION'; 
const GET_LOCATION ='GET_LOCATION'; 
const GET_AVAILABILITY ='GET_AVAILABILITY';
const RESET = 'RESET'; 




export function getMake(make){ 
    return{ 
        type: GET_MAKE, 
        payload: make
    }
}

export function getModel(model){ 
    return{ 
        type: GET_MODEL, 
        payload: model
    }
}

export function getHours(hours){ 
    return{ 
        type: GET_HOURS, 
        payload: hours
    }
}

export function getPrice(price){ 
    return{
        type: GET_PRICE, 
        payload: price
    }
}

export function getDescription(description){ 
    return{ 
        type: GET_DESCRIPTION, 
        payload: description
    }
}

export function getLocation(location){ 
    return{ 
        type: GET_LOCATION, 
        payload: location
    }
}

export function getAvailability(availability){ 
    return{ 
        type: GET_AVAILABILITY, 
        payload: availability
    }
}

export function reset(){
    return{ 
    type: RESET, 
    payload: initialState
    }
}




export default function(state = initialState, action){ 
    const{type,payload} = action; 
    
    switch(type){
        case GET_MAKE: 
            return {...state, post:{...state.post,make:payload } }
        case GET_MODEL: 
            return{...state, post:{...state.post , model:payload}}
        case GET_HOURS:
            return{...state, post:{...state.post, hours: payload}}
        case GET_PRICE: 
            return{...state, post:{...state.post, price:payload}}
        case GET_DESCRIPTION: 
            return{...state, post:{...state.post, description:payload}}
        case GET_LOCATION: 
            return{...state, post:{...state.post, location:payload }}
        case GET_AVAILABILITY: 
            return{...state, post:{...state.post, availability:payload }}
        case RESET: 
            return state = initialState

    default: 
    return state
    }
} 