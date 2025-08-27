// Import React Bootstrap components for styling
import { Alert, Button, Form, Modal } from "react-bootstrap";

// Import React hooks for managing component state
import { useState } from "react";

// Define the props interface for TypeScript
interface NewRecipeModalProps {
  show: boolean; // Whether the modal is visible
  onHide: () => void; // Function to close the modal
}

// NewRecipeModal component for creating new recipes
function NewRecipeModal({ show, onHide }: NewRecipeModalProps) {
  // State to store the form data
  // We use an object to store all the recipe fields
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    cookingTime: "",
    servings: "",
  });

  // State to track if we're currently saving the recipe (for loading state)
  const [isLoading, setIsLoading] = useState(false);

  // State to store any error messages
  const [error, setError] = useState("");

  // Function to handle form input changes
  // This updates the formData state when user types in any field
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev, // Keep all existing values
      [name]: value, // Update only the changed field
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Reset error state
    setError("");
    setIsLoading(true);

    try {
      // Make API call to create new recipe
      const response = await fetch("http://localhost:3001/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          // Add some default values
          isFavorite: false,
          createdAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create recipe");
      }

      // Reset form and close modal on success
      setFormData({
        title: "",
        description: "",
        ingredients: "",
        instructions: "",
        cookingTime: "",
        servings: "",
      });
      onHide();

      // Refresh the page to show the new recipe
      window.location.reload();
    } catch (err) {
      setError("Failed to create recipe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Modal component that can be shown/hidden
    <Modal show={show} onHide={onHide} size="lg">
      {/* Modal header with title and close button */}
      <Modal.Header closeButton>
        <Modal.Title>Create New Recipe</Modal.Title>
      </Modal.Header>

      {/* Modal body contains the form */}
      <Modal.Body>
        {/* Show error message if there's an error */}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Form for creating new recipe */}
        <Form onSubmit={handleSubmit}>
          {/* Recipe title field */}
          <Form.Group className="mb-3">
            <Form.Label>Recipe Title *</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder="Enter recipe title"
            />
          </Form.Group>

          {/* Recipe description field */}
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              placeholder="Brief description of the recipe"
            />
          </Form.Group>

          {/* Ingredients field */}
          <Form.Group className="mb-3">
            <Form.Label>Ingredients</Form.Label>
            <Form.Control
              as="textarea"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleInputChange}
              rows={4}
              placeholder="List ingredients (one per line)"
            />
          </Form.Group>

          {/* Instructions field */}
          <Form.Group className="mb-3">
            <Form.Label>Instructions</Form.Label>
            <Form.Control
              as="textarea"
              name="instructions"
              value={formData.instructions}
              onChange={handleInputChange}
              rows={4}
              placeholder="Step-by-step cooking instructions"
            />
          </Form.Group>

          {/* Cooking time and servings in a row */}
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Cooking Time (minutes)</Form.Label>
                <Form.Control
                  type="number"
                  name="cookingTime"
                  value={formData.cookingTime}
                  onChange={handleInputChange}
                  placeholder="30"
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Servings</Form.Label>
                <Form.Control
                  type="number"
                  name="servings"
                  value={formData.servings}
                  onChange={handleInputChange}
                  placeholder="4"
                />
              </Form.Group>
            </div>
          </div>
        </Form>
      </Modal.Body>

      {/* Modal footer with action buttons */}
      <Modal.Footer>
        {/* Cancel button - closes the modal */}
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>

        {/* Save button - submits the form */}
        <Button variant="primary" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Recipe"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NewRecipeModal;
