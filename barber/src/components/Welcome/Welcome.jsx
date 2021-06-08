import React, { useState } from 'react'
import './welcome.css'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { nextPage } from '../../features/actions'
import axios from 'axios'
import { DATABASE } from '../utility'
import MenuBar from './MenuBar'


const Welcome = () => {

    const history = useHistory()
    const dispatch = useDispatch()

    const [menuBarOpen,setmenuBarOpen] = useState(false)

    const handleClick = async () => {
        history.push('/user/what/1')
        dispatch(nextPage())
        const daysOffForBookings = await axios.get(
            `${DATABASE}/daysoff/fullybooked`
        )
        let noBookingDays =
            daysOffForBookings.data.mydaysOff[0].holidays.concat(
                daysOffForBookings.data.mydaysOff[0].fullyBooked,
                daysOffForBookings.data.mydaysOff[0].closedForBooking,
                daysOffForBookings.data.mydaysOff[0].vacation
            )
        localStorage.setItem('daysoff', noBookingDays)
    }

    const handleClickUser = () => {
        history.push('/admin/dashboard')
    }

    const handleToggleMenu = () => {
        setmenuBarOpen(!menuBarOpen)
    }

    return (
        <div className="currentPage welcome">
            <div className="header" >
                
                <i className="bars big icon "  style={{zIndex:'20'}} onClick={handleToggleMenu}></i>
                <i className="user big icon " onClick={handleClickUser}></i>
                {/* <div className="menuBarDiv">
                    <div className="hamburgerDiv">
                        <div className="hamburgerLine1"></div>
                        <div className="hamburgerLine2"></div>
                        <div className="hamburgerLine3"></div>
                    </div>
                    <button className="toggleMenuBar" onClick={()=>console.log('click')}></button>
                </div> */}
            </div>
            <div className="currentBody">
                <div className="logoDiv"></div>
            </div>
            <div className="currentfooter">
                <button onClick={handleClick}
                    className="ui primary button ">Book Your Appointment</button>
            </div>
            {
                menuBarOpen && <> <MenuBar/> </>
            }
        </div>
    )
}

export default Welcome
