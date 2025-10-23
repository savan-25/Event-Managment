const mongoose = require('mongoose');

const addmissionSchema = new mongoose.Schema(
    {
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event'}
    }
);


// ✅ Ensure one unique registration per email per event
addmissionSchema.index({ email: 1, eventId: 1 }, { unique: true });

module.exports = mongoose.model('Admission',addmissionSchema);