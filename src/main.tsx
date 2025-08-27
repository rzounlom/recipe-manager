// Import Bootstrap CSS for styling
import "bootstrap/dist/css/bootstrap.min.css";
// Import our custom CSS
import "./index.css";

// Import React Router for navigation
import { RouterProvider } from "react-router-dom";
// Import React and ReactDOM for rendering
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Import our router configuration
import { router } from "./router";

// Create the root element and render our app
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* RouterProvider wraps our entire app with routing functionality */}
    <RouterProvider router={router} />
  </StrictMode>
);
