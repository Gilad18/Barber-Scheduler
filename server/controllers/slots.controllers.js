const { findByIdAndUpdate } = require('../models/slots.model')
const slots = require('../models/slots.model')

const createNewSlot = async (req,res) => {
    const {name ,phone, threat , price , date, hour} = req.body                    //how to catch if scheduled is not unique!
    try {
    const newSlot = new slots({
        name,
        phone,
        threat,
        price,
        date,
        hour,
        scheduled : date+hour
    })

    
        await newSlot.save()
        res.status(200).json({succes: 'Your slot is booked succesfully!' , newSlot})
    }
    catch(error){
        res.status(400).json({error})
    }
}

const getTodaySlots = async(req,res) => {
    const theDay = req.params.day
    try {
        const theDaySlots = await slots.find({date: theDay},{hour:1})
          res.status(200).json({success: ' amazing', theDaySlots})
    }
   catch(err) {
       res.json(err)
   }
}

const getDaySchedule = async(req,res) => {
    const theDay = req.params.day
    try {
        const theDaySlots = await slots.find({date: theDay},{scheduled:0})
          res.status(200).json({success: ' amazing', theDaySlots})
    }
   catch(err) {
       res.json(err)
   }
}

const deleteSlot = async (req,res) => {
   const slotID = req.body.slotID
   try {
       const deltetTheSlot = await slots.findByIdAndDelete({_id :slotID})
       res.status(200).json({success: 'The Appoinment has been deleted', deltetTheSlot})
   }
   catch(error) {
    res.status(400).json({error}) 
   }
}

const updateSlot = async (req,res) => {
   
   const updates = Object.keys(req.body)
   const allowupdates = ['phone','threat','price','date', 'hour','scheduled'] 
   const isValidProps = updates.every(item=>allowupdates.includes(item))
   if(!isValidProps) {
       return res.status(406).send({error : ' Invalid Updates'})
   }
   try {
       let extractUpates = {id ,phone ,threat,price,date,hour,scheduled } = req.body;
       const updatedSlot = await slots.findByIdAndUpdate(req.body.id,extractUpates,{new:true,runValidators:true})
        updatedSlot.save()
    }
    catch(error) {
        res.status(400).json
    }
    
}

module.exports = {
    createNewSlot,
    getTodaySlots,
    getDaySchedule,
    deleteSlot,
    updateSlot
}