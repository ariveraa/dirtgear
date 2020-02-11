import React, {useState} from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
 
const Form = ()  => { 
   
        return(
            <div className = 'Form'>
                <input placeholder = 'Make'/>
                <input placeholder = 'Model'/>
                <input placeholder = 'Hours'/>
                {/* use amazon s3 to enter pics here */}
                <input placeholder = 'Description' /> 
                {/* use google maps to get location here */}
                

            </div>
        )
    
}

export default Form