import React, { useState } from 'react'
import './welcome.css'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { nextPage } from '../../features/actions'
import {getDaysOff} from '../functionUntilty'
import MenuBar from './MenuBar'

const Welcome = () => {

    const history = useHistory()
    const dispatch = useDispatch()

    const [menuBarOpen,setmenuBarOpen] = useState(false)

    const handleClick = async () => {
        history.push('/user/what/1')
        dispatch(nextPage())
        getDaysOff()
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
                <i className={`${menuBarOpen ? 'close' : 'bars'} big icon `}  style={{zIndex:'20'}} onClick={handleToggleMenu}></i>
                <i className="user big icon " onClick={handleClickUser}></i>
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
