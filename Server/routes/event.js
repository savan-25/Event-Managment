const express = require('express');
const router = express.Router();
const  Event = require('../models/Event');

router.get('/events',async(req,res)=>{
    try
    {
        const events = await Event.find({type:'event'});
        res.json(events);
    }catch(err)
    {
        res.status(500).json({message:err.message});
    }
});

router.get('/special-event',async(req,res) =>
{
    try
    {
        const events = await Event.find({type:'special'});
        res.json(events);
    }
    catch(err)
    {
        res.status(500).json({message:err.message});
    }
})


module.exports = router;