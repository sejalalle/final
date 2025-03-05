import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Correct
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
