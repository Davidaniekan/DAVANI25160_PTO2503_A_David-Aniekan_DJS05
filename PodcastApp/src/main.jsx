import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

/**
 * Application bootstrap module. Mounts the React application into the DOM.
 *
 * This module:
 * - Locates the DOM element with id `root`.
 * - Creates a React root and renders the `App` component inside `StrictMode`.
 * - Wraps the app with BrowserRouter to enable client-side routing.
 *
 */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
