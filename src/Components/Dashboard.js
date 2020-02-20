import React from 'react'; 
import Posts from './Posts' ; 
import{connect} from 'react-redux'; 
import {useInputValue} from './useInputValue'; 



const Dashboard = (props) => { 

    const search = useInputValue(''); 


 

    return(
        <div className ='dashboard'>
            <div className = 'search-bar'>
                <input className = 'search-input' placeholder = 'What are you looking for?' {...search} />
                <button className = 'search-button'>Search</button> 
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

export default connect(mapStateToProps) (Dashboard); 