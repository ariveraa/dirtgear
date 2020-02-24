import axios from 'axios'; 

const initialState = { 
    posts: [],
    loading: false

}


const GET_POSTS = 'GET_POSTS'; 
export function getAllPost () {
   let posts = axios.get('/api/posts').then(res => res.data).catch(err => err.message)
   return{ 
       type:GET_POSTS, 
       payload:posts
   }
}

const GET_PRO_POSTS ='GET_PRO_POSTS'

export function getProPosts(){ 
    let posts = axios.get('/api/user').then (res => res.data).catch(err => err.message)
   
    return{ 
        type:GET_PRO_POSTS, 
        payload: posts
    }
}



export default function(state = initialState, action){ 
    const{type,payload} = action; 

    switch(type){ 

        case GET_POSTS + '_PENDING': 
            return {...state, loading: true}
        case GET_POSTS + '_FULFILLED': 
            return {...state, loading: false, posts:payload}
        case GET_POSTS + '_REJECTED': 
            return{...state, loading: false}
        
        case GET_PRO_POSTS + '_PENDING': 
            return {...state, loading: true}
        case GET_PRO_POSTS + '_FULFILLED': 
            return {...state, loading: false, posts:payload}
        case GET_PRO_POSTS + '_REJECTED': 
            return{...state, loading: false}
       
        default: 
            return state
    }
}