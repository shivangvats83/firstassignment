// const { Register, login } = require('../Controllers/AuthController');

// const {RegisterValidation, loginValidation} = require('../middlewares/AuthValidation');



// const router = require('express').Router();
// router.post('/login',(req,res)=> {
//     res.send("login successful");
// });

// // router.post('/login', loginValidation, login);
// // router.post('/Register', RegisterValidation, Register);

// router.post('/login', loginValidation , login);
// router.post('/Register', RegisterValidation, Register);

// module.exports = router;

const express = require('express');
const router = express.Router();

// Import the login function from the authController
const { login } = require('../controllers/authController');

// Use the login function as the route handler
router.post('/login', login);

module.exports = router;
