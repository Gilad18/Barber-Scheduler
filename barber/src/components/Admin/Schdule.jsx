import React, { useEffect, useState } from 'react'
import './admin.css'
import { avaiabilty , closingHoursFriday , DATABASE} from '../utility'
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
    const [openEditReservation , setOpenEditReservation] = useState(false)
    const [modalContent, setModalContent] = useState(null)
    const [selfBookClose , setSelfBookClose] = useState(true)

  
    useEffect(() => {
        const serach = async () => {
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
            setTodaySlots(workingHours)
            if(new Date(givenDate).getDay()===5) {
                console.log('friday')
                let shortDay = workingHours.filter((item) => !closingHoursFriday.includes(item))
                 setTodaySlots(shortDay);
            }
        }
        serach()
    }, [givenDate , openModal , openEditReservation])

    useEffect(() => {
        console.log('invoked')                     //find a way to render it
        const isClosedForBooking = async () => {
            const theDateToCheck = moment(givenDate).format('DD-MM-YYYY')
            const isClosed = await axios.get(`${DATABASE}/daysoff/isclosed/${theDateToCheck}`)
            if(isClosed.data.isit===null) {
               return setSelfBookClose(false)
            }
            setSelfBookClose(true)
        }
        isClosedForBooking()
    }, [givenDate])


    const handleSlotClick = (item,e) => {
        if(e.target.className.includes('reserved')) {
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
            <h2> {givenDate} </h2>
            {
                todaySlots.map((item, index) => {
                    return <div className={`slotHour ${item.name ? 'reserved' : ''}`} onClick={(e) => handleSlotClick(item,e)} key={index}>
                        {item.hour}
                        {item.name && <p>{item.name}</p>}
                        {item.threat && <p>{item.threat}</p>}
                    </div>
                })}
            {
                openModal &&
                <div className="modalSlot">
                    <button className="closeMidalBTN" onClick={() => setOpenModal(false)}>
                        <i  aria-hidden="true" className="close  icon"></i>
                    </button>
                <Modal modalContent={modalContent} givenDate={theDate} />
                </div >
            }
                  {
                    openEditReservation &&
                    <div className="modalSlot">
                        <button className="closeMidalBTN" onClick={() => setOpenEditReservation(false)}>
                        <i  aria-hidden="true" className="close  icon"></i>
                        </button>
                    <EditModal modalContent={modalContent} givenDate={theDate} />
                    </div >
                }
            {
               selfBookClose ? 
               <OpenDay givenDate={givenDate}/>
               :
               <CloseDay givenDate={givenDate}/> 
            }
            
        </div>
    )
}
