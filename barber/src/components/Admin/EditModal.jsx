import React, { useState } from 'react'
import axios from 'axios'
import {DATABASE} from '../utility'
import './admin.css'

export default function EditModal({ modalContent, givenDate }) {
       
    const [loading, setLoading] = useState(false)
    const [succes, setSucces] = useState(false)
    const [message , setMessage] = useState('')

    const handleConfirm = async ()  => {
        setLoading(true)
        try {
            const deleteSlot = await axios({
                method : 'delete',
                url : `${DATABASE}/deleteslot`,
                data : {
                    slotID : modalContent._id
                }
            })
            setMessage(deleteSlot.data.success)
            setLoading(false)
            setSucces(true)
        }
        catch(error) {
            console.log(error)
        }
    }

    return (
        <div className="modalBody">
            here you can edit a a booked reservation 
            <h2>{givenDate}</h2>
            <p>{modalContent.hour}</p>   
            <p>{modalContent.name}</p> 
            <p>{modalContent.price}</p>  
            <p>{modalContent.date}</p>
            <p>{modalContent.phone}</p>   
            {
                succes ?
                    <h3 className="successMessage">{message}</h3>
                    :
                    <button className={`ui primary button ${loading ? 'loading' : ''}`} onClick={handleConfirm} >
                       Delete Reservation
            </button>
            }       
        </div>
    )
}
