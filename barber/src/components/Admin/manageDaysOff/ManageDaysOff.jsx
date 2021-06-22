import React, { useState } from 'react'
import './manageDaysOff.css'
import Button from '../backToMenuButton/BackButton'
import Calendar from 'react-calendar';
import axios from 'axios';
import {DATABASE} from '../../utility'

export default function ManageDaysOff() {

    const [value, onChange] = useState(new Date());
    const [loading , setLoading] = useState(false)
    const [message , setMessage] = useState('')

    const setDaysOff =  async () => {
        if (!value[0] || !value[1]) {
            return console.log('please select start and end days')
        }
        setLoading(true)
        let thedays = []               //make sure the right format is pass using moment
        let nextDay = new Date(value[0])
        thedays.push(nextDay.toLocaleDateString('en-GB'))
        while(nextDay.toLocaleDateString('en-GB')!==value[1].toLocaleDateString('en-GB')) {
            nextDay.setDate(nextDay.getDate()+1)
            thedays.push(nextDay.toLocaleDateString('en-GB')) 
        }
        
        try {
            const sendRequest = await axios({
                method : 'post',
                url : `${DATABASE}/daysoff/setvacationdates`,
                data : {
                    days : thedays
                }
            })
            setMessage(sendRequest.data.success)
            setLoading(false)
        }
        catch(error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <div className="manageDaysOffSec">
            <Button />
            Manage Days Off Here
            <div className="daysOffActionSec">
                <div className="calnderDiv">
                    <Calendar
                        onChange={onChange}
                        value={value}
                        calendarType="Hebrew"
                        defaultView="month"
                        maxDetail="month"
                        selectRange={true}
                        returnValue="range"

                    />
                </div>
                <div className="pickedDaysOffs">
                    <h2>Selected Days</h2>
                    <h3>Start -  {value[0] && value[0].toLocaleDateString('en-GB')} </h3>
                    <h3>End - {value[1] && value[1].toLocaleDateString('en-GB')} </h3>
                </div>
                <div className="daysoffSecButton">
                    <button className={`ui primary button ${loading ? 'loading' : ''}`} onClick={setDaysOff}>Set Days Off</button>
                </div>
                <h3 className="daysoffmessage">{message}</h3>
            </div>
        </div>
    )
}
