import React, {Component} from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import {connect} from 'react-redux'; 
import {getAvailability} from './Ducks/postReducer'; 


class Calendar extends Component {
  // constructor(props){ 
  //   super(props)

  //   this.state = this.getInitialState(); 
  // }

  // getInitialState =() => { 
  //   return { 
  //     from: undefined, 
  //     to: undefined
  //   }
  // }

  handleDayClick  = day => { 
    const {availability} = this.props.post

  
    const range = DateUtils.addDayToRange(day, availability)
    
    console.log(range)
    this.setState(range)
    this.props.getAvailability(range)
  }

  handleResetClick(){ 
    
  }


  render(){ 
    const {from, to} = this.props.post.availability; 
    const modifiers = {start: from, end:to}; 
    // console.log(this.props)
    // console.log(this.props.post.availability.from)
    return (
      <div className = 'calendar'> 
        <p> 
          {!from && !to && 'Please select the first day'}
          {from && !to && 'Please select the last day'}
          {from&&
          to &&
          `Selected from ${from.toLocaleDateString()} to
          ${to.toLocaleDateString()}`
          }
        </p>
        <DayPicker 
        //   disabledDays ={[new Date(2020,2,1),
        //   new Date(2020,2, 3 ),
        //   {
        //     after: new Date(2020, 2, 28), 
        //     before: new Date(2020,3,27), 
        //   },
        //   ]}
        
          numberOfMonths = {1}
          selectedDays = {[from, {from, to}]}
          modifiers = {modifiers}
          onDayClick = {this.handleDayClick}
        />

      </div>

    );
  } 
}

function mapStateToProps(state){ 
  return{post:state.postReducer.post}

}

export default connect(mapStateToProps,{getAvailability})(Calendar);
