const mongoose = require ('mongoose');

const slotSchema = new mongoose.Schema({
   
    
    date: {
        type:Date,
        required:true
    },
    timeSlots:[{
        fromTime:  {
            type:String,
            required:true
        },
        toTime:  {
            type:String,
            required:true
        },
        stock:{
            type:Number,
            required:true
        },
        accepted: { 
            type: Boolean, 
            default: true
        },
    }
    ],
  
    updatedAt:{
        type : Date,
        default : ()=>{
            return Date.now();
        }
    }

},{timestamps:true})

module.exports = mongoose.model("Slot",slotSchema)