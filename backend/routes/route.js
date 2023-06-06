const express= require('express');
const crypto = require("crypto");
const nodemailer = require('nodemailer');
const Model = require('../models/model');
const Loan = require('../models/Loan');
const Social = require('../models/Social');
const OtpModel = require('../models/otpModel');
const {authMiddleware}= require('../middleware/auth');
const router= express.Router();

const bcrypt= require('bcrypt');
const {LocalStorage}= require('node-localstorage');
const localStorage = new LocalStorage('./scratch');
const jwt = require('jsonwebtoken');
const { log } = require('console');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    
    user: "testing.seraphic@gmail.com",
    pass: "szbhhjivarnanahe"
  }
});


  router.post('/register', async (req, res) => {
    try {
        console.log('check the register api - ', req.body)
      const existingUser = await Model.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).send({ message: 'Email already registered' });
      }
      const register = new Model({ ...req.body, role: req.body.userType });
      await register.save();
  
      res.status(201).send(register);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  router.post('/login', async (req, res) => {
    const { email, password, phoneNumber } = req.body;
  
    try {
      let user;
      if (email) {
        user = await Model.findOne({ email });
      } else if (phoneNumber) {
        user = await Model.findOne({ phoneNumber });
      } else {
        return res.status(400).json({ message: 'Email or phone number is required' });
      }
  
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
      const mypass= user.password
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Incorrect password' ,mypass});
      }
  
      const token = jwt.sign({ userId: user._id }, 'abcd');
      localStorage.setItem('myToken', token);
      res.token = token;
  
      const storedToken = localStorage.getItem('myToken');
      const decodedToken = jwt.decode(token);
  
      return res.json({ message: 'Successfully logged in', token, decodedToken, storedToken, user});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  router.get('/loan-offers-info', authMiddleware, async (req, res) => {
    try {
  
      const data = await Loan.find();
      res.json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
  
  router.post('/add-loan-offer', async (req, res) => {
    try {
  
      const register = new Loan(req.body);
      await register.save();
      console.log("sucessfully added")
      return res.status(201).send(register);
  
    } catch (error) {
      return res.status(400).send(error);
    }
  });
  
router.post('/update-loanoffer/:id', authMiddleware, async (req, res) => {
  try {
    const loanId = req.params.id;
    const loan = await Loan.findById(loanId);
    if (!loan) {
      return res.status(404).json({ message: 'loan offer not found' });
    }
    loan.amount = req.body.amount || loan.amount;
    loan.period = req.body.period || loan.period;
    loan.interest = req.body.interest || loan.interest;
    
    await loan.save();

    res.json({ message: 'loan offers updated', loan });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
  router.delete('/delete-loanoffer/:id', authMiddleware, async (req, res) => {
    try {
  
      const loan = await Loan.findOneAndDelete({ _id: req.params.id });
  
      if (!loan) {
        return res.status(404).json({ message: 'loan offer not found or unauthorized to delete.' });
      }
      res.json({ message: 'loan offer deleted!', loan });
  
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error.' });
    }
  });
  router.post('/add-new-user', async (req, res) => {
   
    try {
      const existingUser = await Users.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).send({ message: 'Email already registered' });
      }
      const register = new Users(req.body);
      await register.save();
      res.status(201).send(register);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  router.get('/user-info', authMiddleware, async (req, res) => {
    try {
      const data = await Model.find(); 
      res.json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
  
  
 
  router.delete('/delete-user/:id', authMiddleware, async (req, res) => {
    try {
  
      const user = await Model.findOneAndDelete({ _id: req.params.id });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found or unauthorized to delete.' });
      }
      res.json({ message: 'User deleted!', user });
  
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error.' });
    }
  });
  router.post('/update-user-info/:id', authMiddleware, async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await Model.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'loan offer not found' });
      }
      user.name = req.body.name || user.name;
      user.gender = req.body.gender || user.gender;
      user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
      user.email = req.body.email || user.email;
  
      


      await user.save();
  
      res.json({ message: 'user info updated', user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  router.get('/check-user/:id', authMiddleware, async (req, res) => {
    try {
      const data = await Model.findById(req.params.id).select('userType');
  
      if (!data) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ userType: data.userType });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
  router.post('/add-post',authMiddleware, async (req, res) => {
    try {

      const {content,userId}=req.body;
  
      const register = new Social({content,userId});
      await register.save();
      console.log("Posted !")
      return res.status(201).send(register);
  
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  router.get('/post-info', authMiddleware, async (req, res) => {
    try {
      
      const data = await Social.find();
      const Data = await Promise.all(data.map(async post => {
        const user = await Model.findById(post.userId);
        const userName = user ? user.name : null;
        return {
          ...post.toObject(),
          userName
        };
      }));
      res.json(Data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
  
  
  router.post('/update-post/:id', authMiddleware, async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await Social.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'post not found' });
      }
      console.log('body',req.body)
      user.content = req.body.content || user.content;
    
      await user.save();
  
      res.json({ message: 'Post updated', user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
 
  
  router.post("/sendotp", async (req, res) => {
    const { email } = req.body;
  
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
  
    try {
      const user = await Model.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  

      const otp = crypto.randomInt(100000, 999999).toString();
      const timestamp = Date.now();
  
  
      await OtpModel.findOneAndUpdate(
        { email },
        { otp, timestamp },
        { upsert: true }
      );
  
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "OTP for Password Reset",
        text: `Your OTP for password reset is ${otp}. It will expire in 2 minutes.`,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: "Otp not sent" });
        } else {
          console.log("Otp sent: ", info.response);
          return res.status(200).json({ message: "OTP sent successfully", otp });
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to send OTP" });
    }
  });
  

  

  
  
  

  
  
  router.post('/send-mobile-otp', async (req, res) => {
    const { otp, phoneNumber } = req.body;
  
    if (!otp || !phoneNumber) {
      return res.status(400).json({ message: 'OTP and phone number are required' });
    }
  
    try {
      let otpEntry = await OtpModel.findOne({ phoneNumber });
  
      if (otpEntry) {
        otpEntry.otp = otp; 
      } else {
        otpEntry = new OtpModel({ otp, phoneNumber }); 
      }
  
      await otpEntry.save();
  
      return res.status(201).json({ message: 'OTP saved successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to save OTP', error });
    }
  });

  router.post('/verify-otp', async (req, res) => {
    const { phoneNumber, otp } = req.body;

    
  
    if (!phoneNumber || !otp) {
      return res.status(400).json({ message: 'Phone number and OTP are required' });
    }
  
    try {
      const otpEntry = await OtpModel.findOne({ phoneNumber });

      
      if (!otpEntry) {
        return res.status(401).json({ message: 'Invalid OTP' });
      }
  
      const otpValue = otpEntry.otp;

      console.log('check the otpValue - ',typeof otpValue);
      console.log('check the otp - ',typeof otp) 
  
      if (otpValue != otp) {
        return res.status(401).json({ message: 'Invalid OTP',otpValue,phoneNumber });
      }
  
      // const currentTime = Date.now();
      // const timeDiff = currentTime - otpEntry.timestamp;
      // const expiryTime = 2 * 60 * 1000;
  
      // if (timeDiff > expiryTime) {
      
      //   return res.status(401).json({ message: 'OTP has expired' });
      // }
  
     
      return res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to verify OTP' });
    }
  });
  

  router.post('/change-password', async (req, res) => {
    try {
      const { phoneNumber, newPassword, confirmPassword } = req.body;
  
      const user = await Model.findOne({ phoneNumber });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: 'New password and confirm password do not match' });
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      console.log('newPassword',newPassword)

      console.log('hashedPassword',hashedPassword)
     
      await Model.findOneAndUpdate({phoneNumber , phoneNumber} , {password :newPassword })
      return res.status(200).json({ message: 'Password updated successfully'});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  

  
  module.exports = router;