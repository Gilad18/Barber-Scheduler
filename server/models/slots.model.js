const mongoose = require('mongoose');
const validator = require('validator');

const slotSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : false,
        validate(value) {
            if(value.length<3) {
                throw new Error('too short')
            }
        }
    },
    phone : {
        type : String,
        required : true,
        unique :false,
        validate(value){
            if(!validator.isMobilePhone(value ,'he-IL')){
                throw new Error('not a valid num')
            }
        }
    },
    threat : {
        type : String,
        required:true,
        unique :false
    },
    price : {
        type : Number,
        required : true,
        unique:false
    },
    date : {
        type : String,
        required : true,
        unique : false
    },
    hour : {
        type : String,
        required:true,
        unique :false
    },
    scheduled : {
        type : String,
        required:true,
        unique :true
    }
})

const slotModel  = mongoose.model('slots',slotSchema);
module.exports= slotModel;