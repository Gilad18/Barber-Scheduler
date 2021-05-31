import React, { useState } from 'react'
import './welcome.css'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { nextPage } from '../../features/actions'
import axios from 'axios'
import { DATABASE } from '../utility'
import Login from './login/Login'

const Welcome = () => {

    const history = useHistory()
    const dispatch = useDispatch()

    const handleClick = async () => {
        history.push('/user/what/1')
        dispatch(nextPage())
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

    const handleClickUser = () => {
        history.push('/admin/dashboard')
    }

    return (
        <div className="currentPage welcome">
            <div className="header" >
                <i className="user big icon " onClick={handleClickUser}></i>
                <i className="bars big icon "></i>
            </div>
            <div className="currentBody">
                <div className="logoDiv"></div>
            </div>
            <div className="currentfooter">
                <button onClick={handleClick}
                    className="ui primary button">Book Your Appointment</button>
            </div>
        </div>
    )
}

export default Welcome
