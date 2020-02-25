import React from 'react'; 
import Posts from './Posts' ; 
import{connect} from 'react-redux'; 




const Dashboard = (props) => { 




 

    return(
        <div className ='dashboard'>

            
            <div className = 'rentals'> 
                <p className = 'rental-title'>Available For Rent</p>
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