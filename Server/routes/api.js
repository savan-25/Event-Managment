const express = require('express');
const router = express.Router();
const User = require('../models/User')
const newAddmission = require('../models/admission')
const jwt = require('jsonwebtoken');
const Event = require('../models/Event');

const SECRETE_KEY = "savan@25";

router.post('/login',async(req,res) =>
{
   const {email,password} = req.body;
    
   const user = await User.findOne(({ email }));

   if(! user ||user.password != password)
   {
      return res.status(401).json({message:'Invalid Creditionals'});
   }
   const token = jwt.sign({userId:user._id,email:user.email,role:user.role},SECRETE_KEY,{expiresIn:'1h'});

   res.json({token,
      role:user.role,
      message:"Login Successful"
   })
})
// router.post('/signup',async(req,res) =>
// {
//     console.log('Recived Signup dataa',req.body);

//     const { name,email,mobile,password} = req.body;

//      try{
//        const existingUser = await User.findOne({ email });

//     if(existingUser)
//     {
//      return res.status(400).json({ message: 'user already exists'});
//     }
//      const user = new User({ name,email,mobile,password});
//      await user.save();
//      res.status(201).json(user);
//      }catch(err)
//      {
//         console.error('signup error',err.message);
//      res.status(400).send(err.message);

//      }
// })
router.post('/signup',async(req,res) => 
{
   try 
   {
      const { name, email,mobile,password} = req.body;

      // 1. Basic Validation
      if(!name || !email || !mobile || !password)
      {
         return res.status(400).json({message:' All Fields are required'});
      }

      // Email format validation
      const emailRegex =  /\S+@\S+\.\S+/;
      if(!emailRegex.test(email))
      {
         return res.status(400).json({message:'Invalid Email Format'});
      }
      // check if user already exists
      const existingUser = await User.findOne({email});
      if(existingUser)
      {
         return res.status(400).json({message:'User already exists'});
      }


      // create the new user
      const user = new User({name ,email,mobile,password});
      await user.save();
      res.status(201).json(user);
   }
   catch(err)
   {
      console.error('Signup error : ',err);
      res.status(500).json({message:'Something went wrong .Please try again'});
   }
});
// router.post('/admission',async(req,res) =>
// { 
//     console.log("Recived data :" ,req.body);
//    const { studentName,email,phone,eventId} = req.body;

//    try
//    {
//       const newAdd = new newAddmission({
//          name:studentName
//          ,email,phone,
//          event:eventId });
//       await newAdd.save();

//       res.status(201).json(newAdd);
//    }catch(err)
//    {
//       console.error('admission error',err.message);
//       res.status(400).send(err.message);
//    }
   
// })
router.post('/admission',async(req,res) => 
{
   try 
   {
      const {studentName ,email,phone,eventId} = req.body;

      // find the event  by ID
      const event = await Event.findById(eventId);
      if(!event)
      {
         return res.status(404).json({message:'event not found'});
      }

      // 2.Map frontend data to Addmission schema
      const admission  =  new newAddmission ({
         name:studentName,
         email,
         phone,
         event:event.name
      });
      await admission.save();

      res.status(201).json({message:' Admission Successful ',admission});
   }catch(err)
   {
      console.error('Admission error :',err.message);
      res.status(400).json({message:err.message});
      
   }
});

module.exports = router;