import{createStore, combineReducers, applyMiddleware} from 'redux'; 
import promiseMiddleware from 'redux-promise-middleware'; 
import postReducer from './postReducer'; 
import postsDisplayReducer from './postsDisplayReducer';
import userReducer from './userReducer';  

const rootReducer = combineReducers({postReducer, postsDisplayReducer, userReducer})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware))