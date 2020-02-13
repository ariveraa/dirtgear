import React, {useEffect} from 'react'; 
import Posts from './Posts' ; 
import{connect} from 'react-redux'; 
import{getProfile} from './Ducks/userReducer'; 

const Dashboard = (props) => { 

    useEffect(() => {props.getProfile()},[])

    return(
        <div className ='dashboard'>
            <div className = 'search-bar'>
                <input placeholder = 'What are you looking for?'/>
                <button>Search</button> 
            </div>
            
            <div className = 'rentals'> 
                <p>Available For Rent</p>
                <Posts /> 
            </div> 
            {/* googlemaps here */}
            
        </div>
    )
}

function mapStateToProps(state){
    return{profile: state.userReducer.profile}
}

export default connect(mapStateToProps, {getProfile}) (Dashboard); 