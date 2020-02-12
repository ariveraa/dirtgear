import React, {Component} from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';


class Calendar extends Component {
  constructor(props){ 
    super(props)

    this.state = this.getInitialState(); 
  }

  getInitialState =() => { 
    return { 
      from: undefined, 
      to: undefined
    }
  }

  handleDayClick  = day => { 
    const range = DateUtils.addDayToRange(day, this.state)
    this.setState(range)
  }

  handleResetClick(){ 
    this.setState(this.getInitialState()); 
  }


  render(){ 
    const {from, to} = this.state; 
    const modifiers = {start: from, end:to}; 
    console.log(this.state)
    return (
      <div> 
        <p> 
          {!from && !to && 'please select the first day'}
          {from && !to && 'please select the last day'}
          {from&&
          to &&
          `Selected from ${from.toLocaleDateString()} to
          ${to.toLocaleDateString()}`}{' '}
          {from && to && (
            <button onClick = {this.handleResetClick}> 
            reset
            </button>
          )}
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

export default Calendar;
