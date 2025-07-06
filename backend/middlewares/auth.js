
// const Joi = require('joi');

// const signupValidation = (req, res, next) => {
//   const schema = Joi.object({
//     name: Joi.string().min(3).max(100).required(),
//     email: Joi.string().email().required(),
//     password: Joi.string().min(4).max(100).required()
//   });

//   const { error } = schema.validate(req.body);
//   if (error) {
//     return res.status(400).json({
//       message: error.details[0].message
//     });
//   }
//   next();
// };

// const loginValidation = (req, res, next) => {
//   const schema = Joi.object({
//     email: Joi.string().email().required(),
//     password: Joi.string().min(4).max(100).required()
//   });

//   const { error } = schema.validate(req.body);
//   if (error) {
//     return res.status(400).json({
//       message: error.details[0].message
//     });
//   }
//   next();
// };

// module.exports = {
//   signupValidation,
//   loginValidation
// };

// const Joi = require('joi');

// const signupValidation = (req, res, next) => {
//   const schema = Joi.object({
//     name: Joi.string().min(3).max(100).required(),
//     email: Joi.string().email().required(),
//     password: Joi.string().min(4).max(100).required()
//   });

//   const { error } = schema.validate(req.body);
//   if (error) {
//     return res.status(400).json({
//       message: error.details[0].message 
//     });
//   }
//   next();
// };

// const loginValidation = (req, res, next) => {
//   const schema = Joi.object({
//     email: Joi.string().email().required(),
//     password: Joi.string().min(4).max(100).required()
//   });

//   const { error } = schema.validate(req.body);
//   if (error) {
//     return res.status(400).json({
//       message: error.details[0].message 
//     });
//   }
//   next();
// };

// module.exports = {
//   signupValidation,
//   loginValidation
// };
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

// ✅ JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// ----------------------
// 🔒 Joi Validations
// ----------------------
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

// ----------------------
// 📝 Route: POST /signup
// ----------------------
router.post('/signup', signupValidation, async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    res.status(500).json({ message: 'Signup error', error });
  }
});

// ----------------------
// 📝 Route: POST /login
// ----------------------
router.post('/login', loginValidation, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '2h' });

    res.status(200).json({ message: 'Login successful', jwtToken: token, user });
  } catch (error) {
    res.status(500).json({ message: 'Login error', error });
  }
});

// ----------------------------
// 📝 Route: POST /google-login
// ----------------------------
router.post('/google-login', async (req, res) => {
  const { email, name, picture } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name,
        email,
        picture,
        password: '' // Optional: you may also store "google" as a provider field
      });

      await user.save();
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '2h' });

    res.status(200).json({ message: 'Google login successful', jwtToken: token, user });
  } catch (error) {
    res.status(500).json({ message: 'Google login error', error });
  }
});

module.exports = router;

