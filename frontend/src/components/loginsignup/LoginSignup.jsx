import React, { useState } from 'react';
import './LoginSignup.css';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

import EmailIcon from '../Assets/email.png';
import PasswordIcon from '../Assets/password.png';
import PersonIcon from '../Assets/person.png';

const LoginSignup = () => {
  const [action, setAction] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (!emailRegex.test(email)) return alert("Invalid email.");
    if (password.length < 4) return alert("Password too short.");
    if (!specialCharRegex.test(password)) return alert("Password needs a special character.");

    const payload = { email, password };
    if (action === 'signup') {
      if (!name || name.length < 3) return alert("Name must be at least 3 characters.");
      payload.name = name;
    }

    try {
      const response = await fetch(`http://localhost:8000/auth/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Something went wrong");

      if (action === "signup") {
        alert("Signup successful! Please log in.");
        setAction("login");
      } else {
        localStorage.setItem("token", data.jwtToken);
        alert("Login successful!");
        navigate("/home");
      }

    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("Google user:", decoded);

      const response = await fetch("http://localhost:8000/auth/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: decoded.email, name: decoded.name, picture: decoded.picture })
      });

      const data = await response.json();

      if (data && data.success) {
        alert("Google login successful!");
        localStorage.setItem("token", data.jwtToken);
        navigate("/home");
      } else {
        alert("Google login failed.");
      }
    } catch (error) {
      console.error("Google login error:", error);
      alert("Error during Google login.");
    }
  };



  return (
    <div>
      <div className="container">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>

        <div className="inputs">
          {action === "login" ? null : (
            <div className="input">
              <img src={PersonIcon} alt="person" />
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="input">
            <img src={EmailIcon} alt="email" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input">
            <img src={PasswordIcon} alt="password" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {action === "signup" ? null : (
          <div className="forgot-password">Lost password? <span>Click here</span></div>
        )}

        <div className="submit-container">
          <div className={action === "signup" ? "submit gray" : "submit"} onClick={() => setAction("signup")}>Sign Up</div>
          <div className={action === "login" ? "submit gray" : "submit"} onClick={() => setAction("login")}>Login</div>
        </div>

        <div className="submit" onClick={handleSubmit}>Submit</div>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => {
              alert("Google Sign-In Failed");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;