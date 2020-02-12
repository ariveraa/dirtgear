import React, {useState} from 'react';
import Calendar from './Calendar'; 


 
const Form = ()  => { 
    const[make, setMake] = useState('')
    const[model,setModel] = useState('')
    const[hours, setHours] = useState('')
    const[description, setDescription] = useState('')

        return(
            <div className = 'Form'>
                <p>Make:</p>
                <input 
                placeholder = 'Enter Make'
                value = {make}
                onChange = {(e) => setMake(e.target.value)}
                />
                <p>Model:</p>
                <input 
                placeholder = 'Enter Model'
                value = {model}
                onChange = {(e) => setModel(e.target.value)}
                />
                <p>Hours:</p>
                <input 
                placeholder = 'Enter Hours'
                value = {hours}
                onChange = {(e) => setHours(e.target.value)}
                />
                {/* use amazon s3 to enter pics here */}
                <p>Description:</p>
                <input 
                placeholder = 'Enter Description' 
                value = {description}
                onChange = {(e) => setDescription(e.target.value)}
                /> 
                {/* use google maps to get location here */}
                <Calendar />
           
                <button>Post</button>
            </div>
        )
    
}

export default Form