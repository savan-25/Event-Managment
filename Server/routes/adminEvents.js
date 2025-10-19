const express = require('express');
const Event = require('../models/Event');
const Addmissions  = require('../models/admission');
const router = express.Router();

// Create event
router.post('/create',async (req, res) => {
  const { name,description,Teacher,type } = req.body;
  const event = new Event({ name, description,Teacher,type});
  await event.save();
  res.json({ message: 'Event created' });
});

router.get('/getAdmissions',async(req,res) =>
{
  try
  {
     const participants = await Addmissions.find().populate('eventId', 'name');
    // const members = await Addmissions.find();
     res.json(participants)
  }catch(err)
  {
    res.status(500).json({message:err.message});
  }
  
})
// Delete Event
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Event
router.put('/update/:id', async (req, res) => {
  try {
    const { name, description, Teacher, type } = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { name, description, Teacher, type },
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event updated successfully', event: updatedEvent });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

//////////


 