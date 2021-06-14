import React, {useState} from 'react'
import './manageDaysOff.css'
import Button from '../backToMenuButton/BackButton'
import Calendar from 'react-calendar';

export default function ManageDaysOff() {

    const [value, onChange] = useState(new Date());

    return (
        <div className="manageDaysOffSec">
           <Button/>
           Set Your Days Off
           <div className="daysOffActionSec">
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
        </div>
    )
}
