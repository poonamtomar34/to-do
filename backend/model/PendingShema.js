const mongoose=require('mongoose');
const feedbaackSchema=mongoose.Schema({
    taskName:{
        type:String,
        unique : true
    },
    description:{
        type:String,
    },
    date:{
        type:Date
    }
})
module.exports=mongoose.model('feedback',feedbaackSchema)