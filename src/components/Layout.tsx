// Import React Bootstrap components for styling
import { Container } from "react-bootstrap";
// Import our custom components
import Navbar from "./Navbar";
import NewRecipeModal from "./NewRecipeModal";
// Import React Router components for navigation
import { Outlet } from "react-router-dom";
// Import React hooks for managing component state
import { useState } from "react";

// Layout component that wraps all pages
// This component provides the common structure (navbar) for all pages
function Layout() {
  // State to control whether the new recipe modal is shown or hidden
  // useState returns an array: [currentValue, functionToUpdateValue]
  const [showNewRecipeModal, setShowNewRecipeModal] = useState(false);

  return (
    // Container provides consistent spacing and responsive behavior
    <Container fluid className="p-0">
      {/* Navbar component that appears on all pages */}
      <Navbar onNewRecipe={() => setShowNewRecipeModal(true)} />

      {/* Outlet is a React Router component that renders the child route */}
      {/* This is where our page components (HomePage, AllRecipesPage, etc.) will be displayed */}
      <main className="py-4">
        <Outlet />
      </main>

      {/* Modal for creating new recipes */}
      {/* This modal can be opened from the navbar */}
      <NewRecipeModal
        show={showNewRecipeModal}
        onHide={() => setShowNewRecipeModal(false)}
      />
    </Container>
  );
}

export default Layout;
