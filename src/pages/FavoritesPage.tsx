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

// FavoritesPage component - displays only favorite recipes
function FavoritesPage() {
  // State to store favorite recipes
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);

  // State to track if we're loading the recipes
  const [isLoading, setIsLoading] = useState(true);

  // State to store any error messages
  const [error, setError] = useState("");

  // useEffect hook runs when the component mounts (first loads)
  useEffect(() => {
    // Function to fetch favorite recipes from the API
    const fetchFavoriteRecipes = async () => {
      try {
        // Make API call to get all recipes and filter for favorites
        const response = await fetch(
          "https://68af8db1b91dfcdd62bc8eca.mockapi.io/recipies"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }

        const allRecipes = await response.json();
        // Filter to only show favorite recipes
        const favorites = allRecipes.filter(
          (recipe: Recipe) => recipe.isFavorite
        );
        setFavoriteRecipes(favorites);
      } catch (err) {
        setError("Failed to load favorite recipes");
        console.error("Error fetching favorite recipes:", err);
      } finally {
        setIsLoading(false);
      }
    };

    // Call the function to fetch favorite recipes
    fetchFavoriteRecipes();
  }, []); // Empty dependency array means this effect runs only once when component mounts

  // Function to handle favorite toggle for recipes
  const handleFavoriteToggle = async (
    recipeId: number,
    isFavorite: boolean
  ) => {
    try {
      // Make API call to update favorite status
      const response = await fetch(
        `https://68af8db1b91dfcdd62bc8eca.mockapi.io/recipies/${recipeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...favoriteRecipes.find((r) => r.id === recipeId),
            isFavorite,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update favorite status");
      }

      // If recipe is unfavorited, remove it from the favorites list
      if (!isFavorite) {
        setFavoriteRecipes((prev) =>
          prev.filter((recipe) => recipe.id !== recipeId)
        );
      } else {
        // If recipe is favorited, update the local state
        setFavoriteRecipes((prev) =>
          prev.map((recipe) =>
            recipe.id === recipeId ? { ...recipe, isFavorite } : recipe
          )
        );
      }
    } catch (err) {
      console.error("Error updating favorite status:", err);
    }
  };

  return (
    // Main content for the favorites page
    <>
      {/* Page header */}
      <Row className="mb-4">
        <Col>
          <h1 className="mb-3">❤️ My Favorite Recipes</h1>
          <p className="text-muted">
            Your collection of favorite recipes. Click the heart icon to remove
            recipes from favorites.
          </p>
        </Col>
      </Row>

      {/* Favorites grid */}
      <Row>
        <Col>
          {/* Show loading spinner while fetching recipes */}
          {isLoading && <LoadingSpinner />}

          {/* Show error message if there's an error */}
          {error && <Alert variant="danger">{error}</Alert>}

          {/* Show favorites if loaded successfully */}
          {!isLoading && !error && (
            <>
              {/* Recipe count */}
              <p className="text-muted mb-4">
                {favoriteRecipes.length === 0
                  ? "No favorite recipes yet"
                  : `Showing ${favoriteRecipes.length} favorite recipe${
                      favoriteRecipes.length !== 1 ? "s" : ""
                    }`}
              </p>

              {/* Favorites grid */}
              {favoriteRecipes.length > 0 ? (
                <Row xs={1} md={2} lg={3} className="g-4">
                  {favoriteRecipes.map((recipe) => (
                    <Col key={recipe.id}>
                      <RecipeCard
                        recipe={recipe}
                        onFavoriteToggle={handleFavoriteToggle}
                      />
                    </Col>
                  ))}
                </Row>
              ) : (
                <div className="text-center py-5">
                  <div className="mb-3">
                    <span style={{ fontSize: "4rem" }}>❤️</span>
                  </div>
                  <h3 className="text-muted">No Favorite Recipes Yet</h3>
                  <p className="text-muted mb-4">
                    Start exploring recipes and click the heart icon to add them
                    to your favorites!
                  </p>
                  <a href="/recipes" className="btn btn-primary">
                    Browse All Recipes
                  </a>
                </div>
              )}
            </>
          )}
        </Col>
      </Row>
    </>
  );
}

export default FavoritesPage;
