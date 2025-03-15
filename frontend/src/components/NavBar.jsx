import React from "react";
import { useNavigate } from "react-router-dom";
import { exportDieline } from "../Mockup/utils/ExportUtils"; 
import "./NavBar.css";

const Navbar = ({ selectedFace, undo, redo, zoom, setZoom, shapeType, customizationState }) => {
  const navigate = useNavigate();

  const handleZoom = (direction) => {
    setZoom((prev) => {
      const newZoom = direction === "in" ? prev + 0.1 : prev - 0.1;
      return Math.min(Math.max(newZoom, 0.5), 2);
    });
  };

  const handleExport = () => {
    if (!shapeType) {
      alert("No shape selected for export!");
      return;
    }
    exportDieline(shapeType, customizationState);
  };

  const handleAddToCart = () => {
    if (!shapeType) {
      alert("No shape selected!");
      return;
    }

    navigate("/cart", { state: { shapeType } }); // ✅ Pass only shape type
  };

  return (
    <div className="navbar">
      <div className="nav-left">
        <button onClick={undo}>⏪ Undo</button>
        <button onClick={redo}>⏩ Redo</button>
      </div>

      <div className="nav-right">
        <button onClick={() => handleZoom("out")}>➖</button>
        <span>{(zoom * 100).toFixed(0)}%</span>
        <button onClick={() => handleZoom("in")}>➕</button>
        <button className="export-btn" onClick={handleExport} disabled={!shapeType}>
          🚀 Export
        </button>
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Navbar;
