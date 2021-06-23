import React, { useState } from 'react'
import { Header, Modal, Button, Icon } from 'semantic-ui-react'
import moment from 'moment'
import axios from 'axios'
import {DATABASE} from '../utility'

export default function CloseDay({ givenDate }) {

    const day = moment(givenDate).format('DD-MM-YYYY')

    const [message, setMessage] = useState('')
    const [success , setSuccess] = useState(false)

    const handleYES = async () => {
        try {
            const setDateDisableForBooking = await axios({
                method: 'post',
                url: `${DATABASE}/daysoff/makefullybooked`,
                data: {
                    day
                }
            })
            setSuccess(true)
            setMessage(setDateDisableForBooking.data.success)
        }

        catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="closeDaySec">
                <h1>
                   Disable {givenDate}?
                </h1>
                <Modal.Content>
                    {
                        !success ? 
                        <React.Fragment>
                            <p>
                        Disabling this day means that your clients
                        won't be able to self-booked them self on their app for this practicular date.</p>
                    <p> However, you will still have the power to book them with
                        your admin access</p>
                        </React.Fragment>
                      :
                      
                       <h1>{message}</h1> 
                    }
                  </Modal.Content>
                <Modal.Actions>
                    <Button inverted onClick={handleYES}>
                        <Icon name='checkmark' /> Yes
                    </Button>
                </Modal.Actions>
        </div>
    )
}
