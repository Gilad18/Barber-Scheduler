import React, { useState } from 'react'
import './customDate.css'
import Button from '../backToMenuButton/BackButton'
import Calendar from 'react-calendar';
import moment from "moment";
import Scheudle from '../Schdule';
import 'react-calendar/dist/Calendar.css';

export default function CustomDate() {
    const [value, onChange] = useState(new Date());
    const [chooseDay ,setChooseDay] = useState(null)

    const handlePickedDay = (e) => {
        setChooseDay(moment(e).format("LL"));
    }

    return (
        <div className="customDateSec">
            <Button />
              Show a custom date schedule
            <div className="calnderDiv">
                <Calendar
                    onChange={onChange}
                    value={value}
                    calendarType="Hebrew"
                    defaultView="month"
                    maxDetail="month"
                    onClickDay={(e) => handlePickedDay(e)}
                    tileDisabled={({ date }) =>
                    date.getDay() === 1 ||
                    date.getDay() === 6
                  }
                />
            </div>
            {
                chooseDay!==null && <Scheudle givenDate={chooseDay}/>
            }
            
        </div>
    )
}
