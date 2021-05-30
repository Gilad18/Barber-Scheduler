import React from 'react'
import axios from 'axios'
import './confirm.css'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { disable } from '../../features/actions'
import {DATABASE} from '../utility'

const ConfirmSlot = () => {

    const mySlot = useSelector((state) => state)
    const dispatch = useDispatch()

    const [succes, setSucces] = useState(false)
    const [loading, setLoading] = useState(false)
    const [erroeMessage, setError] = useState('')

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
                    !succes && <h3>{`Review & Confirm`}</h3>
                }
            </div>
            <div className="currentBody">
                <div className={`slotDetails ${succes ? 'succes' : ''}`}>
                    <h1>{mySlot.slot.details.name}</h1>
                    <h1>Tuesday</h1>
                    <h2>{mySlot.slot.date.date}</h2>
                    <h2>{mySlot.slot.date.hour}</h2>
                    <h3>{mySlot.slot.threat}</h3>
                    <h3>{mySlot.slot.price} ILS</h3>
                </div>
            </div>
            <div className="currentfooter">
                {
                    succes ?
                        <h2 style={{ color: '#C3941D ' }}>Reservation is booked! </h2>
                        :
                        <React.Fragment>                    <button className={`ui primary button ${loading ? 'loading' : ''}`}
                            onClick={handleConfirm} >CONFIRM</button>
                            <p style={{ color: 'red' }}>{erroeMessage}</p>
                        </React.Fragment>
                }
            </div>
        </div>
    )
}

export default ConfirmSlot
