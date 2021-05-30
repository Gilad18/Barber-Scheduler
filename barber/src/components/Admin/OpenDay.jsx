import React, {useState} from 'react'
import { Header, Modal, Button, Icon } from 'semantic-ui-react'
import moment from 'moment'
import axios from 'axios'
import {DATABASE} from '../utility'

export default function OpenDay({givenDate}) {

    const day = moment(givenDate).format('DD-MM-YYYY')

    const [open, setOpen] = useState(false)
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
            setTimeout(() => {
                setOpen(false)
                setSuccess(false)
                setMessage('')
            }, 3000);
        }

        catch (error) {
            console.log(error)
        }
    }
    
    return (
        <div className="closeDaySec">
           
           <Modal
                basic
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                size='small'
                trigger={
                    <button className="ui huge icon button">
                        <i aria-hidden="true" className="users  icon"></i>
                       <p> Open this day for self-booking</p>
                    </button>
                }
            >
                <Header>
                    Are You sure you want to enable {givenDate}?
                </Header>
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
                    <Button basic color='red' inverted onClick={() => setOpen(false)}>
                        <Icon name='remove' /> No
                    </Button>
                    <Button color='green' inverted onClick={handleYES}>
                        <Icon name='checkmark' /> Yes
                    </Button>
                </Modal.Actions>
            </Modal>

        </div>
    )
}
