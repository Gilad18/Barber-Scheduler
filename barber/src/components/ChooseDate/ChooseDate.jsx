import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import axios from 'axios'
import { avaiabilty, closingHoursFriday , DATABASE } from '../utility'
import './chooseDate.css'

import { useDispatch } from 'react-redux'
import { addDate, nextPage } from '../../features/actions'

const ChooseDate = () => {

    const history = useHistory()
    const dispatch = useDispatch()

    let offDays = []

    const getmyDaysOff = async () => {           //is there a better way? it renderss each click
        if (localStorage.getItem('daysoff') === null) {
            const daysOffForBookings = await axios.get(
                `${DATABASE}/daysoff/fullybooked`
            )
            let noBookingDays =
                daysOffForBookings.data.mydaysOff[0].holidays.concat(
                    daysOffForBookings.data.mydaysOff[0].fullyBooked,
                    daysOffForBookings.data.mydaysOff[0].closedForBooking
                )
            localStorage.setItem('daysoff', noBookingDays)
        }

        offDays = localStorage.getItem('daysoff')
    }

    getmyDaysOff()

    const [date, setDate] = useState(new Date())
    const [hour, setHour] = useState(null)
    const [availableHours, setAvailableHours] = useState(avaiabilty)
    const [hourPop, setPopHours] = useState(false)
    const [errorMSG, setErrorMSG] = useState('')
    const [loadingHours , setLoadingHours] = useState(false)


    const handleSubmit = () => {
        setErrorMSG('')
        if (date !== null && hour !== null) {
            dispatch(addDate({
                date: moment(date).format('LL'),
                hour: hour,
            }));

            return setTimeout(() => {
                history.push('/user/confirm/3')
                dispatch(nextPage())
                localStorage.removeItem('daysoff')
            }, 300);
        }
        setErrorMSG('some details are missing')
    }

    const handlePickedDay = async (e) => {
        setLoadingHours(true)
        setPopHours(true)
        const theDate = moment(e).format('LL')
        try {
            const bookedHours = await axios({
                method: 'get',
                url: `${DATABASE}/todaySlot/${theDate}`,
            })
            let theHoursObjects = bookedHours.data.theDaySlots
            let reserved = []
            theHoursObjects.forEach((item) => reserved.push(item.hour))
            let allHoursArray = avaiabilty
            let avaiableHours = allHoursArray.filter((item => !reserved.includes(item)))
            setAvailableHours(avaiableHours)
            if (e.getDay() === 5) {
                let shortDay = avaiableHours.filter((item) => !closingHoursFriday.includes(item))
                setAvailableHours(shortDay)
            }
            setLoadingHours(false)
        }
        catch (err) {
            console.log(err)
            setLoadingHours(false)
        }
    }

    const handlePickHour = (pickedHour) => {
        setHour(pickedHour)
    }
    return (
        <div className="currentPage chooseDate">
            <div className="currentHeader">
                <h3>When?</h3>
            </div>
            <div className="currentBody">
                <Calendar
                    onChange={setDate}
                    value={date}
                    calendarType="Hebrew"
                    defaultView="month"
                    maxDetail="month"
                    tileDisabled={({ date }) => offDays.includes(moment(date).format('DD-MM-YYYY'))
                        || date.getDay() === 1 || date.getDay() === 6}
                    onClickDay={(e) => handlePickedDay(e)}
                    minDate={new Date()}
                />
                {
                    hourPop && <React.Fragment>
                        <h4 style={{ color: 'white' }}>Available slots for {moment(date).format('LL')}</h4>
                        <div className="avaiabily">
                            {
                                loadingHours ?  <div className="ui huge  active loader"></div> :
                                    <React.Fragment>
                                        {availableHours.map((item, index) => {
                                            return <div
                                                className={`hourPick ${hour !== null && hour === item ?
                                                    'thePickedHour' : ''}`}
                                                key={index}
                                                onClick={() => handlePickHour(item)}
                                            >{item}</div>
                                        })}
                                    </React.Fragment>
                            }
                        </div>
                    </React.Fragment>
                }
            </div>
            <div className="currentfooter">
                <h3 style={{ color: 'red' }}>{errorMSG}</h3>
                <button className="ui primary button" onClick={handleSubmit} >NEXT</button>
            </div>
        </div>
    )
}

export default ChooseDate
