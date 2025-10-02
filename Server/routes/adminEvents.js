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

router.get('/getEvent',async(req,res) =>
{
  try
  {
     const members = await Addmissions.find();
     res.json(members)
  }catch(err)
  {
    res.status(500).json({message:err.message});
  }
  
})

module.exports = router;

//////////


 