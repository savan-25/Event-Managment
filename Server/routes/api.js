const express = require('express');
const router = express.Router();
const User = require('../models/User')
const newAdmission = require('../models/admission')
const jwt = require('jsonwebtoken');
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
router.post('/signup',async(req,res) =>
{
    console.log('Recived Signup dataa',req.body);

    const { name,email,mobile,password} = req.body;

     try{
       const existingUser = await User.findOne({ email });

    if(existingUser)
    {
     return res.status(400).json({ message: 'user already exists'});
    }
     const user = new User({ name,email,mobile,password});
     await user.save();
     res.status(201).json(user);
     }catch(err)
     {
        console.error('signup error',err.message);
     res.status(400).send(err.message);

     }
})
router.post('/admission',async(req,res) =>
{
   
   try
   {
      const { name, email, phone, eventId } = req.body;

       if (!name || !email || !eventId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const Admission = new newAdmission({ name, email, phone, eventId });
    await Admission.save();

     res.status(201).json({ message: 'Admission submitted successfully', admission: newAdmission });

   }catch(err)
   {
      console.error('admission error',err.message);
      res.status(400).send(err.message);
   }
   
})

module.exports = router;