import React from 'react'
import './dashboard.css'
import {adminActios} from '../../utility'
import { useHistory } from 'react-router-dom'

export default function Dashboard() {

    const history = useHistory()

     const handleChooseAction = (page) => {
         history.push(page)
     }

    return (
        <div className="dashboardSec">
           
           <div className="logoDiv"></div>
           <h2>Welcome Admin</h2>
           <div className="adminActions">
               {adminActios.map((item,index) => {
                    return <div className="adminActionItem"
                     key={index} onClick={()=>handleChooseAction(item.page)}
                     >{item.name}</div>
               })}
           </div>
           
        </div>
    )
}
