const express = require('express');
const User = require("../models/User.js");
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser.js');

// Route 1: Registration
router.post('/registration', [
  body('name', 'Enter valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').isLength({ min: 8 }),
], async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    try {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: secPass
      });
      await user.save();
      success = true
      const authToken = jwt.sign({ id: user._id }, 'MaaKiChutBKL');
      res.status(201).json({ success, token: authToken });
    } catch (err) {
      if (err.code === 11000) {
        res.status(400).json({ success, error: 'Email already exists' });
      } else {
        res.status(500).json({ success, error: err.message });
      }
    }
});

// Route 2: Login
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({success,  error: "Invalid credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ success, error: "Invalid credentials" });
      }

      const JWT_Secret = "MaaKiChutBKL";
      const authToken = jwt.sign({ id: user._id }, JWT_Secret);
      success = true
      res.status(200).json({ success, token: authToken });
    } catch (err) {
      res.status(500).json({success, error: err.message });
    }
});

// Route 3: Get logged-in user details
router.post('/getUser', fetchUser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
