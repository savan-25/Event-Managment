const mongoose = require('mongoose');

const addmissionSchema = new mongoose.Schema(
    {
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event'}
    }
);

module.exports = mongoose.model('Admission',addmissionSchema);