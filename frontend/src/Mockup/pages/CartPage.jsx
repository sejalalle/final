import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./CartPage.css";

// Shape details with base price, images, and material options
const shapeDetails = {
  square: { name: "Square Box", basePrice: 100, thumbnail: "/MImages/SquareBox.jpg", materials: ["Paperboard", "Kraft", "Rigid"] },
  tallbottle: { name: "Bottle Box", basePrice: 180, thumbnail: "/MImages/TallBottleBox.jpg", materials: ["Paperboard", "Kraft", "Rigid"] },
  tuckend: { name: "Tuck End Box", basePrice: 130, thumbnail: "/MImages/tuckend.jpg", materials: ["Paperboard", "Kraft", "Rigid"] },
  pizza: { name: "Pizza Box", basePrice: 120, thumbnail: "/MImages/PizzaBox.jpg", materials: ["Paperboard", "Kraft", "Rigid"] },
  fliptop: { name: "Flip Top Box", basePrice: 140, thumbnail: "/MImages/FlipTop.jpg", materials: ["Paperboard", "Kraft", "Rigid"] },
  cylinder: { name: "Can", basePrice: 150, thumbnail: "/MImages/Can.jpg", materials: ["Paperboard", "Metal", "Aluminium"] },
  shipping: { name: "Shipping Box", basePrice: 200, thumbnail: "/MImages/shippingBox.jpg", materials: ["Paperboard", "Kraft", "Rigid"] },
  tube: { name: "Tube Box", basePrice: 160, thumbnail: "/MImages/tubebox.jpg", materials: ["Paperboard", "Kraft", "Rigid"] },
};

// Map incoming shapeType to correct key in shapeDetails
const normalizeShapeType = (shapeType) => {
  const mapping = {
    "square-box": "square",
    "tallbottle-box": "tallbottle",
    "tuckend-box": "tuckend",
    "pizza-box": "pizza",
    "fliptop-box": "fliptop",
    "cylinder-box": "cylinder",
    "shipping-box": "shipping",
    "tube-box": "tube",
  };
  
  return mapping[shapeType] || shapeType.replace("-box", ""); // Default fallback
};

// Material price multipliers
const materialPriceFactor = {
  Paperboard: 1.0,
  Kraft: 1.2,
  Rigid: 1.3,
  Metal: 1.5,
  Aluminium: 1.8,
};

// Predefined quantity steps
const quantitySteps = [25, 50, 100, 150, 200, 500];

const CartPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get the selected shape type from navigation state
  let shapeType = location.state?.shapeType || "square"; // Default to square box

  // Normalize shapeType to match shapeDetails keys
  shapeType = normalizeShapeType(shapeType);

  // Debugging: Log the fixed shapeType
  useEffect(() => {
    console.log("Normalized shapeType:", shapeType);
  }, [shapeType]);

  // Ensure shapeType is valid before assigning shape
  const shape = shapeDetails[shapeType] || shapeDetails.square;

  // Debugging: Log the selected shape details
  useEffect(() => {
    console.log("Selected shape:", shape);
  }, [shape]);

  // Initial states
  const [quantity, setQuantity] = useState(25); // Default quantity is 25
  const [selectedMaterial, setSelectedMaterial] = useState(shape.materials[0]); // Default material
  const price = shape.basePrice * materialPriceFactor[selectedMaterial] * quantity; // Calculate total price

  // Handle quantity change with predefined steps
  const handleQuantityChange = (change) => {
    const currentIndex = quantitySteps.indexOf(quantity);
    const newIndex = Math.max(0, Math.min(quantitySteps.length - 1, currentIndex + change));
    setQuantity(quantitySteps[newIndex]);
  };

  // Handle checkout
  const handleCheckout = () => {
    const userId = localStorage.getItem("userId"); // Get logged-in user ID
    const orderDetails = {
      user: userId,
      shape: shape.name,
      quantity,
      price,
      material: selectedMaterial,
      description: `Order for ${quantity} units of ${shape.name} made from ${selectedMaterial}.`,
      thumbnail: shape.thumbnail,
    };
    navigate("/checkout", { state: { orderDetails } });
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 Your Cart</h2>

      <div className="cart-item">
        <img src={shape.thumbnail} alt={shape.name} className="cart-img" />
        <div className="cart-item-info">
          <p className="cart-item-name">{shape.name}</p>

          {/* Quantity Selector */}
          <div className="cart-item-quantity">
            <button className="quantity-btn" onClick={() => handleQuantityChange(-1)} disabled={quantity === 25}>
              ➖
            </button>
            <span>{quantity}</span>
            <button className="quantity-btn" onClick={() => handleQuantityChange(1)}>
              ➕
            </button>
          </div>

          {/* Material Dropdown */}
          <label className="material-label">Material:</label>
          <select className="material-dropdown" value={selectedMaterial} onChange={(e) => setSelectedMaterial(e.target.value)}>
            {shape.materials.map((mat) => (
              <option key={mat} value={mat}>{mat}</option>
            ))}
          </select>

          <p>Price: ₹{price}</p>
        </div>
      </div>

      {/* Total Price */}
      <div className="cart-total">
        <p>Total: ₹{price}</p>
      </div>

      {/* Checkout Button */}
      <button className="checkout-btn" onClick={handleCheckout}>
        ✅ Proceed to Checkout
      </button>
    </div>
  );
};

export default CartPage;
