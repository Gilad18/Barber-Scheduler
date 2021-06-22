import { DATABASE } from "./utility";
import axios from 'axios'

export const getDaysOff = async () => {            //getting all days off and store in localstorage
    const daysOffForBookings = await axios.get(
        `${DATABASE}/daysoff/fullybooked`
    )
    let noBookingDays =
        daysOffForBookings.data.mydaysOff[0].holidays.concat(
            daysOffForBookings.data.mydaysOff[0].fullyBooked,
            daysOffForBookings.data.mydaysOff[0].closedForBooking,
            daysOffForBookings.data.mydaysOff[0].vacation
        )
    localStorage.setItem('daysoff', noBookingDays)
}