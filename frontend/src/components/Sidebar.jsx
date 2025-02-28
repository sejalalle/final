import React from "react";
import "./Sidebar.css";

const Sidebar = ({
  selectedFace,
  faceColors,
  handleColorChange,
  handleImageUpload,
  handleRemoveImage,
  imageScales,
  setImageScales,
  imagePositions,
  setImagePositions,
  resetCustomization,
  setBackgroundColor,
  backgroundColor,
  faceImages,
}) => {
  return (
    <div className="sidebar-container">
      <h3 className="sidebar-title">Customize Your Box</h3>
      <div className="sidebar-content">
        {selectedFace !== null ? (
          <>
            <div className="sidebar-section">
              <p className="sidebar-subtitle">Modifying Face {selectedFace + 1}</p>
              <label className="sidebar-label">Choose Color:</label>
              <input
                type="color"
                value={faceColors[selectedFace] || "#f4e1c1"}
                onChange={(e) => handleColorChange(e.target.value, selectedFace)}
                className="sidebar-color-picker"
              />
            </div>

            <div className="sidebar-section">
              <label className="sidebar-label">Image Options:</label>
              <select
                onChange={(e) => {
                  const action = e.target.value;
                  if (action === "upload") {
                    document.getElementById(`fileInput-${selectedFace}`).click();
                  } else if (action === "remove") {
                    handleRemoveImage(selectedFace);
                  }
                  e.target.value = "";
                }}
                className="sidebar-select"
              >
                <option value="">Select Action</option>
                <option value="upload">Upload Image</option>
                <option value="remove" disabled={!faceImages[selectedFace]}>
                  Remove Image
                </option>
              </select>
              <input
                id={`fileInput-${selectedFace}`}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(e, selectedFace)}
              />
            </div>

            <div className="sidebar-section">
              <label className="sidebar-label">Background Color:</label>
              <input
                type="color"
                value={backgroundColor || "#ffffff"}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="sidebar-color-picker"
              />
            </div>
          </>
        ) : (
          <p className="sidebar-placeholder">Select a face to customize.</p>
        )}

      <div className="sidebar-section">
      {faceImages[selectedFace] && (
              <>
               <p className="sidebar-subtitle">Edit Image:</p>
              <label className="sidebar-label">Scale Image:</label>
                  <input
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.1"
                    value={imageScales[selectedFace] || 1}
                    onChange={(e) => {
                      const newScale = parseFloat(e.target.value);
                      setImageScales((prev) => {
                        const newScales = [...prev];
                        newScales[selectedFace] = newScale;
                        return newScales;
                      });
                    }}
                    className="sidebar-edit-image"
                    />

                
              <label className="sidebar-label">Move Image(X):</label>
                  <input
                    type="range"
                    min="-0.5"
                    max="0.5"
                    step="0.05"
                    value={imagePositions[selectedFace]?.x || 0}
                    onChange={(e) => {
                      const newX = parseFloat(e.target.value);
                      setImagePositions((prev) => {
                        const newPositions = [...prev];
                        newPositions[selectedFace] = { ...newPositions[selectedFace], x: newX };
                        return newPositions;
                      });
                    }}
                    className="sidebar-edit-image"
                  />

              <label className="sidebar-label">Move Image(Y):</label>
                  <input
                    type="range"
                    min="-0.5"
                    max="0.5"
                    step="0.05"
                    value={imagePositions[selectedFace]?.y || 0}
                    onChange={(e) => {
                      const newY = parseFloat(e.target.value);
                      setImagePositions((prev) => {
                        const newPositions = [...prev];
                        newPositions[selectedFace] = { ...newPositions[selectedFace], y: newY };
                        return newPositions;
                      });
                    }}
                    className="sidebar-edit-image"
                  />  

              </>
            )}
            </div>

            </div>

      <div className="sidebar-footer">
        <button onClick={resetCustomization} className="sidebar-button reset-button">
          Reset
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
