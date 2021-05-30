import React, { useEffect, useState } from 'react'
import Schedule from '../Schdule'
import './weekly.css'
import moment from 'moment'

export default function Weekly({ givenDate }) {
    console.log(givenDate)
  

    const [daysArr, setDaysArr] = useState([])

    useEffect(() => {
        const getWeekes = () => {
            var startOfWeek = moment().startOf('isoWeek');
            var endOfWeek = moment().endOf('isoWeek');
            var days = [];
            var day = startOfWeek;
            while (day <= endOfWeek) {
                console.log(day.format('LL'))
                days.push(day.format('LL'));
                day = day.clone().add(1, 'd');
            }
            
            setDaysArr(days);
        }
        getWeekes()
    },[])

   

    // console.log(startOfWeek._d)
    // console.log(endOfWeek._d)

    
    const [didChooseDay, setDidChooseDay] = useState(false)

    const handleChooseDay = (day) => {
        console.log(day)
        setDidChooseDay(true)
    }

    return (
        <React.Fragment>
            {
                didChooseDay ?
                    <React.Fragment>
                        <p onClick={() => setDidChooseDay(false)}> back to weekly display</p>
                        <Schedule givenDate="02-06-2021" />
                    </React.Fragment>
                    :
                    <div className="weeklyPage">
                        <h3>Weekly Heading</h3>
                        <div className="daysGrid">
                            {
                                daysArr.map((item, index) => {
                                    return <div key={index} className="daysGridSingleItem"
                                        onClick={() => handleChooseDay(item)}>
                                        {item}
                                    </div>
                                })
                            }
                        </div>
                    </div>
            }


        </React.Fragment>
    )
}
