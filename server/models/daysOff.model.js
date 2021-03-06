const mongoose = require('mongoose');

const daysOffSchema = mongoose.Schema({
    fullyBooked: [
        {
            type: String,
            required: false,
            unique: true
        }
    ],
    closedForBooking: [
        {
            type: String,
            required: false,
            unique: true
        }
    ],
    vacation: [
        {
            type: String,
            required: false,
            unique: true
        }
    ]
})


const daysOffModel = mongoose.model('daysOff', daysOffSchema);
module.exports = daysOffModel;