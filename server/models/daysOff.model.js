const mongoose = require('mongoose');

const daysOffSchema = mongoose.Schema({
    holidays: [
        {
            type: String,
            required: false,
            unique: true
        }
    ],
    fullyBooked : [
        {
            type: String,
            required: false,
            unique: true
        }
    ],
    closedForBooking : [
        {
            type: String,
            required: false,
            unique: true
        }
    ]
})


const daysOffModel  = mongoose.model('daysOff',daysOffSchema);
module.exports= daysOffModel;