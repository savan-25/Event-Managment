const mongoose = require('mongoose');

const addmissionSchema = new mongoose.Schema(
    {
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  event: { type: String, required: true }
    }
);

module.exports = mongoose.model('Admission',addmissionSchema);