// Import React Bootstrap components for styling
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
// Import icons from react-icons
import {
  FaArrowLeft,
  FaClock,
  FaEdit,
  FaHeart,
  FaRegHeart,
  FaTrash,
  FaUsers,
} from "react-icons/fa";
// Import React hooks for managing component state
import { useEffect, useState } from "react";
// Import React Router components for navigation
import { useNavigate, useParams } from "react-router-dom";

// Import our custom components
import LoadingSpinner from "../components/LoadingSpinner";

// Define the Recipe interface for TypeScript
interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  cookingTime: number;
  servings: number;
  isFavorite: boolean;
  createdAt: string;
}

// SingleRecipePage component - displays a single recipe with edit/delete options
function SingleRecipePage() {
  // Get the recipe ID from the URL parameters
  const { id } = useParams<{ id: string }>();

  // Navigation hook to redirect after actions
  const navigate = useNavigate();

  // State to store the recipe data
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  // State to track if we're loading the recipe
  const [isLoading, setIsLoading] = useState(true);

  // State to store any error messages
  const [error, setError] = useState("");

  // State to control the edit modal
  const [showEditModal, setShowEditModal] = useState(false);

  // State to control the delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // State to track if we're currently saving changes
  const [isSaving, setIsSaving] = useState(false);

  // State to track if we're currently deleting
  const [isDeleting, setIsDeleting] = useState(false);

  // State to store the edit form data
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    cookingTime: "",
    servings: "",
  });

  // useEffect hook runs when the component mounts or when the ID changes
  useEffect(() => {
    // Function to fetch a single recipe from the API
    const fetchRecipe = async () => {
      if (!id) return;

      try {
        // Make API call to get the specific recipe
        const response = await fetch(`http://localhost:3001/recipes/${id}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Recipe not found");
          }
          throw new Error("Failed to fetch recipe");
        }

        const recipeData = await response.json();
        setRecipe(recipeData);

        // Also set the edit form data
        setEditFormData({
          title: recipeData.title,
          description: recipeData.description,
          ingredients: recipeData.ingredients,
          instructions: recipeData.instructions,
          cookingTime: recipeData.cookingTime?.toString() || "",
          servings: recipeData.servings?.toString() || "",
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load recipe");
        console.error("Error fetching recipe:", err);
      } finally {
        setIsLoading(false);
      }
    };

    // Call the function to fetch recipe
    fetchRecipe();
  }, [id]); // Dependency array includes id, so this runs when id changes

  // Function to handle favorite toggle
  const handleFavoriteToggle = async () => {
    if (!recipe) return;

    try {
      // Make API call to update favorite status
      const response = await fetch(
        `http://localhost:3001/recipes/${recipe.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isFavorite: !recipe.isFavorite }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update favorite status");
      }

      // Update the local state to reflect the change
      setRecipe((prev) =>
        prev ? { ...prev, isFavorite: !prev.isFavorite } : null
      );
    } catch (err) {
      console.error("Error updating favorite status:", err);
    }
  };

  // Function to handle edit form input changes
  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to handle edit form submission
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipe) return;

    setIsSaving(true);

    try {
      // Make API call to update the recipe
      const response = await fetch(
        `http://localhost:3001/recipes/${recipe.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...editFormData,
            cookingTime: parseInt(editFormData.cookingTime) || 0,
            servings: parseInt(editFormData.servings) || 0,
            isFavorite: recipe.isFavorite,
            createdAt: recipe.createdAt,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update recipe");
      }

      const updatedRecipe = await response.json();
      setRecipe(updatedRecipe);
      setShowEditModal(false);
    } catch (err) {
      console.error("Error updating recipe:", err);
    } finally {
      setIsSaving(false);
    }
  };

  // Function to handle recipe deletion
  const handleDelete = async () => {
    if (!recipe) return;

    setIsDeleting(true);

    try {
      // Make API call to delete the recipe
      const response = await fetch(
        `http://localhost:3001/recipes/${recipe.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete recipe");
      }

      // Redirect to recipes page after successful deletion
      navigate("/recipes");
    } catch (err) {
      console.error("Error deleting recipe:", err);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    // Main content for the single recipe page
    <>
      {/* Back button */}
      <Row className="mb-3">
        <Col>
          <Button
            variant="outline-secondary"
            onClick={() => navigate("/recipes")}
            className="d-flex align-items-center gap-2"
          >
            <FaArrowLeft />
            Back to Recipes
          </Button>
        </Col>
      </Row>

      {/* Show loading spinner while fetching recipe */}
      {isLoading && <LoadingSpinner />}

      {/* Show error message if there's an error */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Show recipe details if loaded successfully */}
      {!isLoading && !error && recipe && (
        <Row>
          <Col lg={8}>
            {/* Recipe header with title and actions */}
            <div className="d-flex justify-content-between align-items-start mb-4">
              <div>
                <h1 className="mb-2">{recipe.title}</h1>
                <p className="text-muted mb-0">{recipe.description}</p>
              </div>
              <div className="d-flex gap-2">
                {/* Favorite button */}
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={handleFavoriteToggle}
                  className="d-flex align-items-center gap-1"
                >
                  {recipe.isFavorite ? <FaHeart /> : <FaRegHeart />}
                  {recipe.isFavorite ? "Favorited" : "Favorite"}
                </Button>

                {/* Edit button */}
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => setShowEditModal(true)}
                  className="d-flex align-items-center gap-1"
                >
                  <FaEdit />
                  Edit
                </Button>

                {/* Delete button */}
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => setShowDeleteModal(true)}
                  className="d-flex align-items-center gap-1"
                >
                  <FaTrash />
                  Delete
                </Button>
              </div>
            </div>

            {/* Recipe metadata */}
            <div className="d-flex gap-3 mb-4">
              <Badge bg="secondary" className="d-flex align-items-center gap-1">
                <FaClock />
                {recipe.cookingTime || 0} minutes
              </Badge>
              <Badge bg="info" className="d-flex align-items-center gap-1">
                <FaUsers />
                {recipe.servings || 0} servings
              </Badge>
            </div>

            {/* Ingredients section */}
            <Card className="mb-4">
              <Card.Header>
                <h3 className="h5 mb-0">Ingredients</h3>
              </Card.Header>
              <Card.Body>
                <pre
                  className="mb-0"
                  style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}
                >
                  {recipe.ingredients || "No ingredients listed."}
                </pre>
              </Card.Body>
            </Card>

            {/* Instructions section */}
            <Card>
              <Card.Header>
                <h3 className="h5 mb-0">Instructions</h3>
              </Card.Header>
              <Card.Body>
                <pre
                  className="mb-0"
                  style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}
                >
                  {recipe.instructions || "No instructions available."}
                </pre>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Edit Recipe Modal */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Recipe Title *</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={editFormData.title}
                onChange={handleEditInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={editFormData.description}
                onChange={handleEditInputChange}
                rows={3}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ingredients</Form.Label>
              <Form.Control
                as="textarea"
                name="ingredients"
                value={editFormData.ingredients}
                onChange={handleEditInputChange}
                rows={4}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Instructions</Form.Label>
              <Form.Control
                as="textarea"
                name="instructions"
                value={editFormData.instructions}
                onChange={handleEditInputChange}
                rows={4}
              />
            </Form.Group>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Cooking Time (minutes)</Form.Label>
                  <Form.Control
                    type="number"
                    name="cookingTime"
                    value={editFormData.cookingTime}
                    onChange={handleEditInputChange}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Servings</Form.Label>
                  <Form.Control
                    type="number"
                    name="servings"
                    value={editFormData.servings}
                    onChange={handleEditInputChange}
                  />
                </Form.Group>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleEditSubmit}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete "{recipe?.title}"? This action
            cannot be undone.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete Recipe"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SingleRecipePage;
