import React from "react";
import { useNavigate } from "react-router-dom";
import "./OrderSuccess.css";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="order-success-container">
      <h2 className="order-success-title">🎉 Order Placed Successfully!</h2>
      <p className="order-success-message">
        Thank you for your purchase! Your order has been confirmed and is now being processed.
      </p>

      <div className="order-success-actions">
        <button className="success-btn" onClick={() => navigate("/")}>🏠 Back to Home</button>
        <button className="success-btn" onClick={() => navigate("/orders")}>📦 View Orders</button>
      </div>
    </div>
  );
};

export default OrderSuccess;
