// Import React Bootstrap components for styling
import { Alert, Col, Row } from "react-bootstrap";
// Import React hooks for managing component state
import { useEffect, useState } from "react";

import LoadingSpinner from "../components/LoadingSpinner";
// Import our custom components
import RecipeCard from "../components/RecipeCard";

// Define the Recipe interface for TypeScript
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

// AllRecipesPage component - displays all recipes
function AllRecipesPage() {
  // State to store all recipes
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // State to track if we're loading the recipes
  const [isLoading, setIsLoading] = useState(true);

  // State to store any error messages
  const [error, setError] = useState("");

  // useEffect hook runs when the component mounts (first loads)
  useEffect(() => {
    // Function to fetch all recipes from the API
    const fetchRecipes = async () => {
      try {
        // Make API call to get all recipes
        const response = await fetch("http://localhost:3001/recipes");

        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }

        const recipesData = await response.json();
        setRecipes(recipesData);
      } catch (err) {
        setError("Failed to load recipes");
        console.error("Error fetching recipes:", err);
      } finally {
        setIsLoading(false);
      }
    };

    // Call the function to fetch recipes
    fetchRecipes();
  }, []); // Empty dependency array means this effect runs only once when component mounts

  // Function to handle favorite toggle for recipes
  const handleFavoriteToggle = async (
    recipeId: number,
    isFavorite: boolean
  ) => {
    try {
      // Make API call to update favorite status
      const response = await fetch(
        `http://localhost:3001/recipes/${recipeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...recipes.find((r) => r.id === recipeId),
            isFavorite,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update favorite status");
      }

      // Update the local state to reflect the change
      setRecipes((prev) =>
        prev.map((recipe) =>
          recipe.id === recipeId ? { ...recipe, isFavorite } : recipe
        )
      );
    } catch (err) {
      console.error("Error updating favorite status:", err);
    }
  };

  return (
    // Main content for the all recipes page
    <>
      {/* Page header */}
      <Row className="mb-4">
        <Col>
          <h1 className="mb-3">All Recipes</h1>
          <p className="text-muted">
            Browse through our collection of delicious recipes. Click the heart
            icon to mark your favorites!
          </p>
        </Col>
      </Row>

      {/* Recipes grid */}
      <Row>
        <Col>
          {/* Show loading spinner while fetching recipes */}
          {isLoading && <LoadingSpinner />}

          {/* Show error message if there's an error */}
          {error && <Alert variant="danger">{error}</Alert>}

          {/* Show recipes if loaded successfully */}
          {!isLoading && !error && (
            <>
              {/* Recipe count */}
              <p className="text-muted mb-4">
                Showing {recipes.length} recipe{recipes.length !== 1 ? "s" : ""}
              </p>

              {/* Recipes grid */}
              <Row xs={1} md={2} lg={3} className="g-4">
                {recipes.map((recipe) => (
                  <Col key={recipe.id}>
                    <RecipeCard
                      recipe={recipe}
                      onFavoriteToggle={handleFavoriteToggle}
                    />
                  </Col>
                ))}
              </Row>

              {/* Show message if no recipes are available */}
              {recipes.length === 0 && (
                <div className="text-center py-5">
                  <p className="text-muted">No recipes available yet.</p>
                  <p className="text-muted">
                    Use the "New Recipe" button in the navbar to create your
                    first recipe!
                  </p>
                </div>
              )}
            </>
          )}
        </Col>
      </Row>
    </>
  );
}

export default AllRecipesPage;
