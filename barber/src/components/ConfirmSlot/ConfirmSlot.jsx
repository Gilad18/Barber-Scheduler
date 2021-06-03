import React from 'react'
import axios from 'axios'
import './confirm.css'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { disable } from '../../features/actions'
import { DATABASE , daysOfTheWeek } from '../utility'

const ConfirmSlot = () => {

    const mySlot = useSelector((state) => state)
    const dispatch = useDispatch()

    const [succes, setSucces] = useState(false)
    const [loading, setLoading] = useState(false)
    const [erroeMessage, setError] = useState('')

    let theDate = new Date(mySlot.slot.date.date)

    const handleConfirm = async () => {
        setLoading(true)
        setError('')
        try {
            const newSlot = await axios({
                method: 'post',
                url: `${DATABASE}/newslot`,
                data: {
                    name: mySlot.slot.details.name,
                    phone: mySlot.slot.details.phone,
                    threat: mySlot.slot.threat,
                    price: mySlot.slot.price,
                    date: mySlot.slot.date.date,
                    hour: mySlot.slot.date.hour,
                    scheduled: mySlot.slot.date.date + mySlot.slot.date.hour
                }
            })
            setTimeout(() => {
                setSucces(true)
                setLoading(false)
                dispatch(disable())

            }, 1000);
            console.log(newSlot.data)
        }
        catch (error) {
            console.log(error.response.data.error.message)
            setLoading(false)
            setError(error.response.data.error.message)
        }

    }

    return (
        <div className="currentPage confirmSlot">
            <div className="currentHeader">
                {
                    succes ?
                    <h2 className="succcesMsgConfirm">Reservation is booked! </h2>
                    :
                    <h3>{`Review & Confirm`}</h3>
                }
            </div>
            <div className="currentBody">
                <div className="slotDetails">
                    <div className="confirmCard">
                        <div className="confirmItemName">
                        <h1>{mySlot.slot.details.name}</h1>
                        </div>
                        <div className="confirmItemDate">
                        <h2>{daysOfTheWeek[theDate.getDay()]}</h2>
                        </div>
                        <div className="confirmItemDay">
                        
                        <h2>{mySlot.slot.date.date}</h2>
                        </div>
                        <div className="confirmItemHour">
                        <h2>{mySlot.slot.date.hour}</h2>
                        </div>
                        <div className="confirmItemTreat">
                        <h3 >{mySlot.slot.threat}</h3>
                        <h3 >{mySlot.slot.price} ILS</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="currentfooter">
                {
                    !succes &&
                        <React.Fragment>        
                             <button className={`ui primary button ${loading ? 'loading' : ''}`}
                            onClick={handleConfirm} >CONFIRM</button>
                            <p style={{ color: 'red' }}>{erroeMessage}</p>
                        </React.Fragment>
                }
            </div>
        </div>
    )
}

export default ConfirmSlot
