import React, {useState} from 'react'
import {Modal, Button, Icon } from 'semantic-ui-react'
import moment from 'moment'
import axios from 'axios'
import {DATABASE} from '../utility'

export default function OpenDay({givenDate}) {

    const day = moment(givenDate).format('DD-MM-YYYY')

    const [message, setMessage] = useState('')
    const [success , setSuccess] = useState(false)

    const handleYES = async () => {
        try {
            const setDateDisableForBooking = await axios({
                method: 'put',
                url: `${DATABASE}/daysoff/undofullybooked`,
                data: {
                    day
                }
            })
            console.log(setDateDisableForBooking.data.success)
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
                    Enable {givenDate}?
                </h1>
                <Modal.Content>
                    {
                        !success ? 
                        <React.Fragment>
                            <p>
                        Enabling this day means that your clients
                        will be now able to self-booked them self on their app for this practicular date.</p>
                   
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
