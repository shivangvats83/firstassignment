import React from 'react';

const Checkout = () => {

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const loadRazorpay = async () => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load. Check your connection.");
      return;
    }

    const orderData = await fetch("http://localhost:8000/payment/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: 500 }), // 💰 Set your amount here
    }).then(res => res.json());

    const options = {
      key: "CJukFFYASRCTtNK4knfpytIt", // 🔑 Replace with your real test key
      amount: orderData.amount,
      currency: "INR",
      name: "Your Company Name",
      description: "Test Transaction",
      order_id: orderData.id,
      handler: async function (response) {
        const verifyRes = await fetch("http://localhost:8000/payment/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(response),
        });

        const result = await verifyRes.json();
        alert(result.message);
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Pay ₹500</h2>
      <button onClick={loadRazorpay} style={{ padding: "10px 20px", fontSize: "18px" }}>
        Pay Now
      </button>
    </div>
  );
};

export default Checkout;
