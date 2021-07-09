import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import './chooseType.css'
import { theTypes ,  } from '../utility'
import { useDispatch, useSelector } from 'react-redux'
import { addSlot, addDetials, nextPage } from '../../features/actions'
import ButtonF from '../Assets/ButtonF'
const validator = require('validator');

const ChooseType = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector(state => state.slot)
    const [name, setName] = useState('')
    const [phone, setNum] = useState('')
    const [phoneERR, setPhoneErr] = useState(false)
    const [errorMSG, setErrorMSG] = useState('')


    const handleCLick = (types) => {
        dispatch(addSlot({
            threat: types.name,
            price: types.price,
            id: Date.now()
        }))
        setErrorMSG('')
    }


    useEffect(() => {
        setPhoneErr(false)
        const timeoutId = setTimeout(() => {
            if (!validator.isMobilePhone(phone, 'he-IL')) {
                if (phone.length > 0) {
                    setPhoneErr(true)
                }
            }
        }, 1000);
        return () => {
            clearTimeout(timeoutId)
        }
    }, [phone])

    const handleSetNumber = (e) => {
        setNum(e.target.value)
        setErrorMSG('')
    }

    const handleNEXT = () => {
        setErrorMSG('')
        if (state !== null && state.detials !== null) {
            dispatch(addDetials({
                name: name,
                phone: phone,
            }));

            return setTimeout(() => {
                history.push('/user/when/2')
                dispatch(nextPage())
            }, 300);
        }
        setErrorMSG('Some detials are missing')
    }

    return (
        <div className="currentPage chooseType">
            <div className="currentHeader">
                <h3>{`Who and What?`}</h3>
            </div>
            <div className="secondBody">
                <div className="inputDiv">
                    <input type="text" name="yourName" required placeholder="Enter your name here..."
                        onChange={e => setName(e.target.value)}
                        value={name}></input>
                </div>
                <div className="inputDiv">
                    
                    <input type="number" name="phone" required placeholder="Can I have your number?"
                        onChange={(e) => handleSetNumber(e)} value={phone}></input>
                       {
                        validator.isMobilePhone(phone, 'he-IL') &&  <i className="large thumbs up icon"></i>
                    }
                    {phoneERR && <p className="phoneErrorMSG">Not a valid phone number</p>}
                </div>
            </div>
            <div className="currentBody">
                {theTypes.map((item, index) => {
                    return <div key={index}>
                        <div className={`slotType ${state !== null && state.threat === item.name ? 'selectedType' : ''} `}
                            onClick={(e) => handleCLick(item)}>{item.name}</div>
                    </div>
                })}
            </div>
            <div className="currentfooter">
                <ButtonF onClick={handleNEXT} text='Next'/>
                <h3 style={{ color: 'red' }}>{errorMSG}</h3>
            </div>
        </div>
    )
}

export default ChooseType
