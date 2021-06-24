const daysOff = require('../models/daysOff.model')
const slots = require('../models/slots.model')
var moment = require('moment')
moment().format();

const closeDayForBooking = async (req, res) => {
    const day = req.body.day
    try {
        await daysOff.updateOne({ $push: { closedForBooking: day } })
        res.status(200).json({ success: `${day} is now disabled for booking` })
    }
    catch (error) {
        res.status(400).json({ error })
    }
}

const getDaysOff = async (req,res) => {
    try {
       const mydaysOff =  await daysOff.find({})
        res.status(200).json({ success:'success', mydaysOff })
    }
    catch(error) {
        res.status(400).json({ error })
    }
}

const openDayForBooking = async (req,res) => {
    const day = req.body.day
    try {
        await daysOff.updateOne({ $pull: { closedForBooking: day } })        // oposite of push here
        res.status(200).json({ success: `${day} is now enabled for booking` })
    }
    catch (error) {
        res.status(400).json({ error })
    }
}


const isClosedForBooking = async (req,res) => {
    const day = req.params.day
    try {
        console.log('here')
        const isit = await daysOff.findOne({closedForBooking : {$in :day}})
        res.status(200).json({ success:'some message' , isit})

    }
    catch(error) {
        res.status(400).json({ error })
    }
}

const setVacationDates = async (req, res) => {
    const day = req.body.days
    for(let i=0 ; i<day.length ; i++){
        let exsitedSlots = await slots.findOne({date:day[i]})
        if(exsitedSlots) {
            return res.status(400).json(
            {message : `You have a reserved slot on ${day[i]},
             Make sure to cancel it before you set a vaction day`})
        }
    }
    try {
        await daysOff.updateOne({ $push: { vacation: day } })
        res.status(200).json({ success: 'vacations dates updated succesffuly' })
    }
    catch (error) {
        res.status(400).json({ error })
    }
}


module.exports = {
    closeDayForBooking,
    getDaysOff,
    openDayForBooking,
    isClosedForBooking,
    setVacationDates
}