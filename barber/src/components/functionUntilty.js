import { DATABASE } from "./utility";
import axios from 'axios'
import {holidays} from './utility'

export const getDaysOff = async () => {            //getting all days off and store in localstorage
    const daysOffForBookings = await axios.get(
        `${DATABASE}/daysoff/fullybooked`
    )
    let holidaysArray = [...holidays]
    let holidayDates =  []
    holidaysArray.map((item)=> holidayDates.push(item.date) )
    console.log(daysOffForBookings.data)
   let allOffDays = holidayDates.concat(daysOffForBookings.data.mydaysOff[0].fullyBooked,
        daysOffForBookings.data.mydaysOff[0].closedForBooking,
        daysOffForBookings.data.mydaysOff[0].vacation)     
        console.log(allOffDays)
    localStorage.setItem('daysoff', allOffDays)
}