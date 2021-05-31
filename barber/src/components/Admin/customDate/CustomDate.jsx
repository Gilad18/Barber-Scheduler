import React, { useState } from 'react'
import './customDate.css'
import Button from '../backToMenuButton/BackButton'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function CustomDate() {
    const [value, onChange] = useState(new Date());

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
                />
            </div>

        </div>
    )
}
