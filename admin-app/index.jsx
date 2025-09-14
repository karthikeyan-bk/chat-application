import React from "react";
import ReactDOM from "react-dom/client";
import App from "./src/App";
import "./src/Admin.css"; // your Tailwind + custom styles

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
