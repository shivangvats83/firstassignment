
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';


const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

router.post('/signup', signupValidation, async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      provider: 'local'
    });

    await newUser.save();

    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    res.status(500).json({ message: 'Signup error', error });
  }
});


router.post('/login', loginValidation, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !user.password) return res.status(400).json({ message: 'Invalid email or login method' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '2h' });

    res.status(200).json({ message: 'Login successful', jwtToken: token, user });
  } catch (error) {
    res.status(500).json({ message: 'Login error', error });
  }
});


router.post('/google-login', async (req, res) => {
  const { email, name, picture } = req.body;

  if (!email || !name) {
    return res.status(400).json({ success: false, message: "Missing Google user data" });
  }

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name,
        email,
        picture,
        password: '',
        provider: 'google'
      });
      await user.save();
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '2h' });

    res.status(200).json({
      success: true,
      message: 'Google login successful',
      jwtToken: token,
      user
    });

  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ success: false, message: 'Google login error', error });
  }
});

module.exports = router;
