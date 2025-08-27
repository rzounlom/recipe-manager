// Import React Bootstrap components for styling
import {
  Navbar as BootstrapNavbar,
  Button,
  Container,
  Nav,
} from "react-bootstrap";
// Import React Router components for navigation
import { Link, useLocation } from "react-router-dom";

// Import icons from react-icons
import { FaPlus } from "react-icons/fa";

// Define the props interface for TypeScript
// This tells TypeScript what props this component expects
interface NavbarProps {
  onNewRecipe: () => void; // Function that will be called when "New Recipe" is clicked
}

// Navbar component that appears on all pages
function Navbar({ onNewRecipe }: NavbarProps) {
  // useLocation hook gets the current URL path
  // We use this to highlight the active navigation link
  const location = useLocation();

  return (
    // BootstrapNavbar provides the navigation bar styling and behavior
    <BootstrapNavbar bg="dark" variant="dark" expand="lg" className="mb-3">
      <Container>
        {/* Brand/logo that links to home page */}
        <BootstrapNavbar.Brand as={Link} to="/">
          🍳 Recipe Manager
        </BootstrapNavbar.Brand>

        {/* Hamburger menu button for mobile devices */}
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navigation links that collapse on mobile */}
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          {/* Left side navigation links */}
          <Nav className="me-auto">
            {/* Home link - active when we're on the home page */}
            <Nav.Link as={Link} to="/" active={location.pathname === "/"}>
              Home
            </Nav.Link>

            {/* All Recipes link - active when we're on the recipes page */}
            <Nav.Link
              as={Link}
              to="/recipes"
              active={location.pathname === "/recipes"}
            >
              All Recipes
            </Nav.Link>

            {/* Contact link - active when we're on the contact page */}
            <Nav.Link
              as={Link}
              to="/contact"
              active={location.pathname === "/contact"}
            >
              Contact
            </Nav.Link>
          </Nav>

          {/* Right side - New Recipe button */}
          <Button
            variant="success"
            onClick={onNewRecipe}
            className="d-flex align-items-center gap-2"
          >
            <FaPlus /> {/* Plus icon */}
            New Recipe
          </Button>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;
