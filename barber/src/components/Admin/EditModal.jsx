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
            <h2>{givenDate}</h2>
            <h2>{modalContent.hour}</h2>   
            <h4>{modalContent.name}</h4> 
            <h4>{modalContent.threat}</h4>  
            <h4>{modalContent.phone}</h4>   
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
