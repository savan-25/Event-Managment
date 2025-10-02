const mongoose = require('mongoose');

const addmissionSchema = new mongoose.Schema(
    {
      name:String,
      email:String,
      phone:Number
    }
);

module.exports = mongoose.model('Admission',addmissionSchema);