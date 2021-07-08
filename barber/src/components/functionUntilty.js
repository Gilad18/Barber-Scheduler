import { DATABASE , avaiabilty , closingHoursFriday , holidays} from "./utility";
import axios from 'axios'


export const getDaysOff = async () => {            //getting all days off and store in localstorage
    const daysOffForBookings = await axios.get(
        `${DATABASE}/daysoff/fullybooked`
    )
    let holidaysArray = [...holidays]
    let holidayDates =  []
    holidaysArray.map((item)=> holidayDates.push(item.date) )
   let allOffDays = holidayDates.concat(daysOffForBookings.data.mydaysOff[0].fullyBooked,
        daysOffForBookings.data.mydaysOff[0].closedForBooking,
        daysOffForBookings.data.mydaysOff[0].vacation)     
    localStorage.setItem('daysoff', allOffDays)
}

export const getavailabilty = (theDay, slots) => {
    if (new Date(theDay).getDay() === 1 || new Date(theDay).getDay() === 6) {
      return "OFF";
    }
    if (new Date(theDay).getDay() === 5) {
      let theAvailabilty =
        slots / [avaiabilty.length - closingHoursFriday.length];
      return `${(theAvailabilty * 100).toFixed(0)}%`;
    }
    let theAvailabilty = slots / avaiabilty.length;
    return `${(theAvailabilty * 100).toFixed(0)}%`;
  };
