const daysOff = require('../models/daysOff.model')

const createDaysOff = async (req, res) => {         //just for creation, can be ignore, lter delete
    try {
        const newTable = new daysOff({
            holidays: ['18-05-2021', '25-05-2021'],
            fullyBooked: ['01-06-2021', '03-06-2021']
        })

        await newTable.save()
        res.status.json({ success: 'new table created' })
    }
    catch (error) {
        res.status(400).json({ error })
    }
}

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

const setHolidays = async (req,res) => {
  const dates = req.body.dates
  try {
     await daysOff.updateMany({$set:{holidays : dates}})
     res.status(200).json({success:'msg'})
  }
  catch(error) {
    res.status(400).json({ error })
  }
}
 /*

few options we need :

1. check if a specific day is holiday/off/fully booked
2. get all days that can't be booked
3. undo a day from diabledForBooking


 */



module.exports = {
    createDaysOff,
    closeDayForBooking,
    getDaysOff,
    openDayForBooking,
    isClosedForBooking,
    setHolidays
}