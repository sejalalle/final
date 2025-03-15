import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const orderDetails = location.state?.orderDetails ?? {};
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  let token = localStorage.getItem("token") ?? "";
  token = token.startsWith("Bearer ") ? token.slice(7).trim() : token.trim();
  const userEmail = localStorage.getItem("userEmail") || "customer@example.com";

  useEffect(() => {
    if (!token) {
      alert("You need to log in to proceed to checkout.");
      navigate("/login");
    }
  }, [token, navigate]);

  if (!orderDetails.shape) {
    return (
      <div className="checkout-container">
        <h2 className="checkout-title">🛍️ Order Summary</h2>
        <p>No order details found. Please add an item first.</p>
        <button className="checkout-btn" onClick={() => navigate("/")}>
          Go Back
        </button>
      </div>
    );
  }

  const handleCheckout = async () => {
    if (!description.trim()) {
      alert("Description is required.");
      return;
    }

    console.log("🚀 Sending Order Data:", orderDetails);

    try {
      setLoading(true);

      const orderData = {
        items: [
          {
            shape: orderDetails.shape,
            quantity: orderDetails.quantity,
            material: orderDetails.material || "Not specified",
            description: description.trim(),
          },
        ],
        totalPrice: orderDetails.price,
        status: "Pending",
      };

      const response = await axios.post("http://localhost:5000/api/orders", orderData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.status === 201) {
        console.log("✅ Order Created Successfully:", response.data);
        openRazorpay(orderDetails.price, response.data.order._id);
      } else {
        alert("Failed to create order. Please try again.");
      }
    } catch (error) {
      console.error("❌ Checkout Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong while placing the order.");
    } finally {
      setLoading(false);
    }
  };

  const openRazorpay = (amount, orderId) => {
    if (!window.Razorpay) {
      alert("Payment gateway failed to load. Please refresh the page and try again.");
      return;
    }

    const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY; // Use Vite env variable

    if (!RAZORPAY_KEY) {
      console.error("❌ Razorpay Key is missing!");
      alert("Payment failed: No Razorpay key found.");
      return;
    }

    const options = {
      key: RAZORPAY_KEY,
      amount: amount * 100,
      currency: "INR",
      name: "Your Company",
      description: "Order Payment",
      handler: async function (response) {
        try {
          await axios.put(
            `http://localhost:5000/api/orders/${orderId}`,
            { status: "Paid" },
            {
              headers: {
                Authorization: token ? `Bearer ${token}` : "",
                "Content-Type": "application/json",
              },
            }
          );
          navigate("/orderSuccess"); // Navigate to the OrderSuccess page
        } catch (error) {
          console.error("Payment Update Error:", error);
          alert("Payment successful, but failed to update order. Contact support.");
        }
      },
      prefill: {
        name: localStorage.getItem("userName") || "Customer",
        email: userEmail,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function (response) {
      console.error("Razorpay Payment Failed:", response.error);
      alert("Payment failed. Please try again.");
    });

    rzp.open();
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">🛍️ Order Summary</h2>

      <div className="checkout-item">
        <img src={orderDetails.thumbnail} alt={orderDetails.shape} className="checkout-img" />
        <div className="checkout-info">
          <p className="checkout-name">{orderDetails.shape}</p>
          <p>Quantity: {orderDetails.quantity}</p>
          <p>Material: {orderDetails.material || "Not specified"}</p>
          <p>Price: ₹{orderDetails.price}</p>
        </div>
      </div>

      <textarea
        className="checkout-description"
        placeholder="Add a description (required)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        style={{ width: "100%", height: "60px", resize: "none" }}
      ></textarea>

      <button className="checkout-btn" onClick={handleCheckout} disabled={loading}>
        {loading ? "Processing..." : "✅ Proceed to Payment"}
      </button>
    </div>
  );
};

export default CheckoutPage;