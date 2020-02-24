

const initialState ={ 
    post: {
        make: '', 
        model: '', 
        hours: '',
        price: '', 
        description: '', 
        location: '', 
        availability: {from: '', to: ''} , 
        photo1: '', 
        photo2: '', 
        phot3: ''
    }, 
    edit: false, 
    id: 0
}

const GET_ID = 'GET_ID'; 
const GET_MAKE ='GET_MAKE'; 
const GET_MODEL ='GET_MODEL'; 
const GET_HOURS ='GET_HOURS'; 
const GET_PRICE = 'GET_PRICE'; 
const GET_DESCRIPTION ='GET_DESCRIPTION'; 
const GET_LOCATION ='GET_LOCATION'; 
const GET_AVAILABILITY ='GET_AVAILABILITY';
const GET_PHOTO1 = 'GET_PHOTO1'; 
const GET_PHOTO2 = 'GET_PHOTO2'; 
const GET_PHOTO3 = 'GET_PHOTO3'; 
const SET_EDIT = 'SET_EDIT'; 
const RESET = 'RESET'; 

export function getId(id){ 
    return{ 
        type: GET_ID,
        payload: id
    }
}


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

export function getPhoto1(photo){ 
    return{ 
        type: GET_PHOTO1, 
        payload: photo
    }
}

export function getPhoto2(photo){ 
    return{ 
        type: GET_PHOTO2, 
        payload: photo
    }
}

export function getPhoto3(photo){ 
    return{ 
        type: GET_PHOTO3, 
        payload: photo
    }
}

export function setEdit(){
    const edit = !initialState.edit
    return{
        type:SET_EDIT,
        payload:edit
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
        case GET_ID: 
            return{...state, id:payload }
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
        case GET_PHOTO1: 
            return{...state,post:{...state.post,photo1:payload}}
        case GET_PHOTO2: 
            return{...state,post:{...state.post,photo2:payload}}
        case GET_PHOTO3: 
            return{...state,post:{...state.post,photo3:payload}}
        case SET_EDIT: 
            return{...state, edit:{edit:payload}}
        case RESET: 
            return state = initialState

    default: 
    return state
    }
} 