const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../models/User");


const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists, please login.",
        success: false,
      });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "Signup successful",
      success: true,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({
      message: "Internal server error during signup",
      success: false,
    });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(403).json({
        message: "Email or password is incorrect",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(403).json({
        message: "Email or password is incorrect",
        success: false,
      });
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successful",
      success: true,
      jwtToken,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      message: "Internal server error during login",
      success: false,
    });
  }
};


const googleLogin = async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email || !name) {
      return res.status(400).json({
        message: "Missing email or name from Google login",
        success: false,
      });
    }

    let user = await UserModel.findOne({ email });

    // Create new user if not exists
    if (!user) {
      user = new UserModel({
        name,
        email,
        password: "GOOGLE_AUTH", // dummy password
      });
      await user.save();
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Google login successful",
      success: true,
      jwtToken,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    console.error("Google Login Error:", error);
    res.status(500).json({
      message: "Internal server error during Google login",
      success: false,
    });
  }
};


module.exports = {
  signup,
  login,
  googleLogin,
};
