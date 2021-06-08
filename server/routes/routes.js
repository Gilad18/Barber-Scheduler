const express = require('express');
const router = express.Router();
const slotControllers = require('../controllers/slots.controllers')
const daysOffControllers = require('../controllers/daysOff.controllers')

router.post('/newslot' , (req,res) => {
    slotControllers.createNewSlot(req , res)
})
.get('/todaySlot/:day' , (req,res) => {
    slotControllers.getTodaySlots(req,res)
})
.get('/schedule/:day' , (req,res) => {              //requierd Authorization
    slotControllers.getDaySchedule(req,res)
})
.post('/daysoff/create' , (req,res) => {
    daysOffControllers.createDaysOff(req,res)
})
.post('/daysoff/makefullybooked' , (req,res) => {
    daysOffControllers.closeDayForBooking(req,res)
})
.get('/daysoff/fullybooked' , (req,res) => {
    daysOffControllers.getDaysOff(req,res)
})
.put('/daysoff/undofullybooked' , (req,res) => {
    daysOffControllers.openDayForBooking(req,res)
}).get('/daysoff/isclosed/:day' , (req,res) => {
    daysOffControllers.isClosedForBooking(req,res)
})
.delete('/deleteslot' , (req,res) => {
    slotControllers.deleteSlot(req,res)
})
.put('/updateholidays', (req,res) => {
    daysOffControllers.setHolidays(req,res)
})
.put('/updateSlotbyID' , (req,res) => {
    slotControllers.updateSlot(req,res)
})
.get('/getnextsevendays' , (req,res) => {
    slotControllers.getNext7Days(req,res)
})
.post('/daysoff/setvacationdates' , (req,res) => {
    console.log('here')
    daysOffControllers.setVacationDates(req,res)
})


module.exports = router;