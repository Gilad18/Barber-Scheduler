import React from 'react'
import { useHistory } from 'react-router-dom'

export default function BackButton() {

    const history = useHistory()

    const handleBAck = () => {
        history.push('/admin/dashboard')
    }

    return (
        <React.Fragment>
             <button className="backToMenu" onClick={handleBAck} ><i className="home icon"></i></button>
        </React.Fragment>
    )
}
