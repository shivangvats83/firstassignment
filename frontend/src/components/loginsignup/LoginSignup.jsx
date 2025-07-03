


import React, { useState } from 'react' 
import './LoginSignup.css'
import { useNavigate } from 'react-router-dom';


import EmailIcon from '../Assets/email.png'
import PasswordIcon from '../Assets/password.png'
import PersonIcon from '../Assets/person.png'

const LoginSignup = () => {
  const [action, setAction] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
const handleSubmit = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }

  if (!specialCharRegex.test(password)) {
    alert("Password must contain at least one special character.");
    return;
  }

  if (action === 'Register') {
   
    alert("Registered successfully! Now please log in.");
    setAction('login'); // 
  } else {
    
    alert("Logged in successfully!");
    localStorage.setItem("isLoggedIn", "true");
    navigate('/home');
  }
};
// const onSubmit =(data)=> console.log(data)
  return (
    
    <div>
      <div className="container">
        <div className="header">
          <div className="text" >{action}</div>
          <div className="underline"></div>
        </div>

        <div className="inputs">
          {action === "login" ? null : (
            <div className="input">
              <img src={PersonIcon} alt="" />
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)} 
              />
            </div>
          )}
            {/* <div className="inputs">
              {action === "login"? <div></div> : <div className="input">
          <img src={PersonIcon} alt="" />
          <input type="text" placeholder="Name" />
        </div>} */}
       
        <div className="input">
          <img src={EmailIcon} alt="email icon" />
          <input type="email" placeholder="Email" value = {email}  onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="input">
          <img src={PasswordIcon} alt="password" />
          <input type="password" placeholder='Password' value = {password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      </div>
      {action === "Register" ? <div></div> : <div className="forgot-password">Lost password? <span>Click here</span></div>}
        
      <div className="submit-container">
        <div className={action === "Register" ? "submit gray" : "submit"} onClick={() => { setAction("Register") }}>Register</div>
        <div className={action === "login" ? "submit gray" : "submit"} onClick={() => { setAction("login") }}>login</div>
      </div>
      <div className="submit" onClick={handleSubmit}>
          Submit
        </div>
    </div>
    </div>
  );
}

export default LoginSignup;
