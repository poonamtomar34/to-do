const mongoose=require('mongoose');
const feedbaackSchema=mongoose.Schema({
    taskName:{
        type:String,
        unique : true
    },
    description:{
        type:String,
    },
    startDate:{
        type:String,
    },
    taskStatus:{
        type: String,
    },
    endDate:{
        type:String,
    }
})
module.exports=mongoose.model('feedback',feedbaackSchema)