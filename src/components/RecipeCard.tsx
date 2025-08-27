// Import React Bootstrap components for styling
import { Badge, Button, Card } from "react-bootstrap";
// Import icons from react-icons
import { FaClock, FaHeart, FaRegHeart, FaUsers } from "react-icons/fa";

// Import React Router components for navigation
import { Link } from "react-router-dom";
// Import React hooks for managing component state
import { useState } from "react";

// Define the Recipe interface for TypeScript
// This describes the structure of a recipe object
interface Recipe {
  id: number;
  title: string;
  description: string;
  imgUrl: string;
  ingredients: string;
  instructions: string;
  cookingTime: number;
  servings: number;
  isFavorite: boolean;
  createdAt: string;
}

// Define the props interface for TypeScript
interface RecipeCardProps {
  recipe: Recipe; // The recipe data to display
  onFavoriteToggle?: (recipeId: number, isFavorite: boolean) => void; // Optional callback for favorite toggle
  showViewMore?: boolean; // Whether to show the "View More" button
}

// RecipeCard component that displays a single recipe
function RecipeCard({
  recipe,
  onFavoriteToggle,
  showViewMore = true,
}: RecipeCardProps) {
  // State to track if we're currently updating the favorite status (for loading state)
  const [isUpdatingFavorite, setIsUpdatingFavorite] = useState(false);

  // Function to handle favorite button click
  const handleFavoriteClick = async () => {
    // If no callback provided, don't do anything
    if (!onFavoriteToggle) return;

    setIsUpdatingFavorite(true);

    try {
      // Call the parent component's function to update favorite status
      await onFavoriteToggle(recipe.id, !recipe.isFavorite);
    } catch (error) {
      console.error("Failed to update favorite status:", error);
    } finally {
      setIsUpdatingFavorite(false);
    }
  };

  return (
    // Card component that displays the recipe information
    <Card className="h-100 shadow-sm">
      {/* Recipe image */}
      {recipe.imgUrl && (
        <Card.Img
          variant="top"
          src={recipe.imgUrl}
          alt={recipe.title}
          style={{ height: "200px", objectFit: "cover" }}
        />
      )}

      {/* Card header with title and favorite button */}
      <Card.Header className="d-flex justify-content-between align-items-start">
        <Card.Title className="mb-0 fs-6">{recipe.title}</Card.Title>

        {/* Heart icon button for favorite functionality */}
        <Button
          variant="link"
          size="sm"
          onClick={handleFavoriteClick}
          disabled={isUpdatingFavorite}
          className="p-0 text-decoration-none"
        >
          {/* Show filled heart if favorite, empty heart if not */}
          {recipe.isFavorite ? (
            <FaHeart className="text-danger" />
          ) : (
            <FaRegHeart className="text-muted" />
          )}
        </Button>
      </Card.Header>

      {/* Card body with recipe details */}
      <Card.Body className="d-flex flex-column">
        {/* Recipe description */}
        <Card.Text className="flex-grow-1">
          {recipe.description || "No description available."}
        </Card.Text>

        {/* Recipe metadata (cooking time and servings) */}
        <div className="d-flex gap-3 mb-3">
          {/* Cooking time badge */}
          <Badge bg="secondary" className="d-flex align-items-center gap-1">
            <FaClock />
            {recipe.cookingTime || 0} min
          </Badge>

          {/* Servings badge */}
          <Badge bg="info" className="d-flex align-items-center gap-1">
            <FaUsers />
            {recipe.servings || 0} servings
          </Badge>
        </div>

        {/* Action buttons */}
        <div className="d-flex gap-2">
          {/* View More button - links to the single recipe page */}
          {showViewMore && (
            <Link
              to={`/recipes/${recipe.id}`}
              className="btn btn-outline-primary btn-sm flex-grow-1"
            >
              View More
            </Link>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default RecipeCard;
