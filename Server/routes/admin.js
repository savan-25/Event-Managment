const express = require('express'); // framework for handling HTTP Requests
const jwt = require('jsonwebtoken'); // used to create JWT tokens
const Admin = require('../models/admin'); //it is mongoose model for Admin Collection
const router = express.Router();
const SECRET_KEY = "savan@25"; //Secret key (savan@25) will be used to sign JWT tokens (in real projects, this should be in .env file).

// Admin login route
router.post('/login',async(req,res) =>
{
  try
  {
   const { username,password} = req.body;
    
   const user = await Admin.findOne(({ username,password }));

  //  if(! user ||user.password != password)
  //  {
  //     return res.status(401).json({message:'Invalid Creditionals'});
  //  }

      if (!user) {
      return res.status(401).json({ message: 'Invalid username' });
    }
     if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }
  // const token = jwt.sign({userId:user._id,email:user.email,role:user.role},SECRETE_KEY,{expiresIn:'1h'});
  const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    // ✅ Send response
    res.json({
      token,
      role: user.role,
      message: "Login Successful"
    });
  }
    catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }

  
})

module.exports = router; 


/*
Client (Angular frontend) sends login credentials (username + password) in request body.

Backend searches MongoDB for a matching admin document.
*/
