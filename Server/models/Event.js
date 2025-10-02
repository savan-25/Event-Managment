const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name:{
        type :String,
        required : true
    },
    description : String,
    Teacher:String,
    type:{
        type:String,
        default:'event'
    }
});

module.exports = mongoose.model('Event',eventSchema);