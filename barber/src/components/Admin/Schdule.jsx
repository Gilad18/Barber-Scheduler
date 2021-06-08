import React, { useEffect, useState } from 'react'
import './admin.css'
import { avaiabilty, closingHoursFriday, DATABASE, daysOfTheWeek, holidays } from '../utility'
import Modal from './ReserveSlotModal'
import EditModal from './EditModal'
import axios from 'axios'
import CloseDay from './CloseDay'
import OpenDay from './OpenDay'
import moment from 'moment'


export default function Scheudle({ givenDate }) {

    let workingHours = []
    avaiabilty.forEach((item) => workingHours.push({ hour: item }))
    const theDate = givenDate


    const [todaySlots, setTodaySlots] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [openEditReservation, setOpenEditReservation] = useState(false)
    const [modalContent, setModalContent] = useState(null)
    const [selfBookClose, setSelfBookClose] = useState(true)
    const [isHoliday, setisHoliday] = useState(false)
    const [isdayOff, setisDayOff] = useState(false)


    useEffect(() => {
        const serach = async () => {
            if (holidays.find((item) => item.date === givenDate)) {  
                return setisHoliday(true)
            }
            if (new Date(givenDate).getDay() === 1 || new Date(givenDate).getDay() === 6) {
                return setisDayOff(true)
            }
            setisHoliday(false)
            setisHoliday(false)
            const getSlots = await axios({
                method: 'get',
                url: `${DATABASE}/schedule/${givenDate}`
            })
            const theSlots = getSlots.data.theDaySlots
            for (let i = 0; i < workingHours.length; i++) {
                for (let k = 0; k < theSlots.length; k++) {
                    if (theSlots[k].hour === workingHours[i].hour) {
                        workingHours[i] = theSlots[k]
                    }
                }
            }
            if (new Date(givenDate).getDay() === 5) {
                let shortDay = workingHours.filter((item) => !closingHoursFriday.includes(item.hour))
                return setTodaySlots(shortDay);
            }
            setTodaySlots(workingHours)
        }
        serach()
    }, [givenDate, openModal, openEditReservation])

    useEffect(() => {
                    //find a way to render it
        const isClosedForBooking = async () => {
            const theDateToCheck = moment(givenDate).format('DD-MM-YYYY')
            const isClosed = await axios.get(`${DATABASE}/daysoff/isclosed/${theDateToCheck}`)
            if (isClosed.data.isit === null) {
                return setSelfBookClose(false)
            }
            setSelfBookClose(true)
        }
        isClosedForBooking()
    }, [])


    const handleSlotClick = (item, e) => {
        if (e.target.className.includes('reserved')) {
            setModalContent(item)
            setOpenEditReservation(true)
            return console.log('booked slot, want to edit or delete?')
            //here we should open a diffrent modal for edit, delete reservation
        }
        setModalContent(item)
        setOpenModal(true)
    }
    return (
        <div className={`adminPage`}>
            {selfBookClose &&
                <React.Fragment>
                    <p className="headingMessgaeSchedule"> * This day is close for self-booking</p>
                </React.Fragment>}
            <h2>{`${givenDate}   /  ${daysOfTheWeek[new Date(givenDate).getDay()]}`}</h2>
            {isHoliday || isdayOff ? <h2>No Work Today</h2> : <>
                {
                    todaySlots.map((item, index) => {
                        return <div className={`slotHour ${item.name ? 'reserved' : ''}`} onClick={(e) => handleSlotClick(item, e)} key={index}>
                            {item.hour}
                            {item.name && <p>{item.name}</p>}
                            {item.threat && <p>{item.threat}</p>}
                        </div>
                    })}</>}
            {
                openModal &&
                <div className="modalSlot">
                    <button className="closeMidalBTN" onClick={() => setOpenModal(false)}>
                        <i aria-hidden="true" className="close  icon"></i>
                    </button>
                    <Modal modalContent={modalContent} givenDate={theDate} />
                </div >
            }
            {
                openEditReservation &&
                <div className="modalSlot">
                    <button className="closeMidalBTN" onClick={() => setOpenEditReservation(false)}>
                        <i aria-hidden="true" className="close  icon"></i>
                    </button>
                    <EditModal modalContent={modalContent} givenDate={theDate} />
                </div >
            }
            {
                selfBookClose ?
                    <OpenDay givenDate={givenDate} />
                    :
                    <CloseDay givenDate={givenDate} />
            }

        </div>
    )
}
