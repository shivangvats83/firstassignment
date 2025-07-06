
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token (you can adjust this based on your storage structure)
    localStorage.removeItem("token"); // or sessionStorage.clear()
    navigate("/"); // Redirect to login page
  };

  const handlePayment = async () => {
    try {
      const res = await fetch('http://localhost:8000/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 5 })
      });

      const data = await res.json();

      if (!data.success) {
        alert("Error in creating order");
        return;
      }

      const options = {
        key: "rzp_test_9uJgaTmR1sJx6o",
        amount: data.order.amount,
        currency: "INR",
        name: "Shivang Store",
        description: "Test Transaction",
        order_id: data.order.id,
        handler: function (response) {
          alert("Payment successful!");
          console.log(response);
        },
        prefill: {
          name: "Shivang Vats",
          email: "shivang@example.com",
          contact: "8859095011"
        },
        theme: {
          color: "#4c00b4",
        },
        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true
        }
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong during payment");
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '60px' }}>
      <h1>Welcome to Home Page</h1>
      <p>You are successfully logged in.</p>

      <button
        onClick={handlePayment}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: '#4c00b4',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          marginTop: '20px',
          marginRight: '10px'
        }}
      >
        Pay ₹5 Now
      </button>

      <button
        onClick={handleLogout}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: '#e60000',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
