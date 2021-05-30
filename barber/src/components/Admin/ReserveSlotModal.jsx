import React, { useState } from 'react'
import { theTypes , DATABASE } from '../utility'
import axios from 'axios'
import './admin.css'

export default function ReserveSlotModal({ modalContent, givenDate }) {

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [thretment, setThretment] = useState('')
    const [price, setPrice] = useState(null)
    const [loading, setLoading] = useState(false)
    const [succes, setSucces] = useState(false)

    const handleConfirm = async () => {
        setLoading(true)
        try {
            const setReservation = await axios({
                method: 'post',
                url: `${DATABASE}/newslot`,
                data: {
                    name: name,
                    phone: phone,
                    threat: thretment,
                    price: price,
                    date: givenDate,
                    hour: modalContent.hour,
                    scheduled: givenDate + modalContent.hour
                }
            })
            console.log(setReservation)
            setTimeout(() => {
                setLoading(false)
                setSucces(true)
            }, 1000);

        }
        catch (err) {
            console.log(err)
        }
    }

    const handleSetThretment = (type, theprice) => {
        setThretment(type)
        setPrice(theprice)
    }
    return (
        <div className="modalBody">
            <div className="ModalDateAndHour">
                <h1>{modalContent.hour}</h1>
                <h2>{givenDate}</h2>
            </div>
            <div className="ModalClientInfo">
                <input type="text" name="yourName" required placeholder="Client Name"
                    onChange={e => setName(e.target.value)}></input>
                <input type="number" name="phone" required placeholder="Client Phone"
                    onChange={e => setPhone(e.target.value)}></input>
            </div>
            <div className="modalTypeSelcet">
                {
                    theTypes.map((item, index) => {
                        return <div key={index}
                        className={`thretmentTypeItem ${thretment===item.name ? 'selectedType' : ''}`}
                            onClick={() => handleSetThretment(item.name, item.price)}
                        >{item.name}</div>
                    })
                }
            </div>
            {
                succes ?
                    <h3 className="successMessage">Client was successfuly Booked!</h3>
                    :
                    <button className={`ui primary button ${loading ? 'loading' : ''}`} onClick={handleConfirm} >
                        Confirm Reservation
            </button>
            }

        </div>
    )
}
