// Import React Bootstrap components for styling
import { Card, Col, Row } from "react-bootstrap";
// Import React hooks for managing component state
import { useEffect, useState } from "react";

// Import React Router components for navigation
import { Link } from "react-router-dom";
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

// HomePage component - the main landing page
function HomePage() {
  // State to store the featured recipes
  const [featuredRecipes, setFeaturedRecipes] = useState<Recipe[]>([]);

  // State to track if we're loading the recipes
  const [isLoading, setIsLoading] = useState(true);

  // State to store any error messages
  const [error, setError] = useState("");

  // useEffect hook runs when the component mounts (first loads)
  useEffect(() => {
    // Function to fetch recipes from the API
    const fetchFeaturedRecipes = async () => {
      try {
        // Make API call to get recipes
        // We'll get the first 3 recipes to feature on the home page
        const response = await fetch(
          "https://68af8db1b91dfcdd62bc8eca.mockapi.io/recipies?_limit=3"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }

        const recipes = await response.json();
        setFeaturedRecipes(recipes);
      } catch (err) {
        setError("Failed to load featured recipes");
        console.error("Error fetching recipes:", err);
      } finally {
        setIsLoading(false);
      }
    };

    // Call the function to fetch recipes
    fetchFeaturedRecipes();
  }, []); // Empty dependency array means this effect runs only once when component mounts

  // Function to handle favorite toggle for featured recipes
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
            ...featuredRecipes.find((r) => r.id === recipeId),
            isFavorite,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update favorite status");
      }

      // Update the local state to reflect the change
      setFeaturedRecipes((prev) =>
        prev.map((recipe) =>
          recipe.id === recipeId ? { ...recipe, isFavorite } : recipe
        )
      );
    } catch (err) {
      console.error("Error updating favorite status:", err);
    }
  };

  return (
    // Main content for the home page
    <>
      {/* Hero section with welcome message */}
      <Row className="mb-5">
        <Col>
          <Card className="text-center bg-primary text-white">
            <Card.Body className="py-5">
              <h1 className="display-4 mb-3">🍳 Welcome to Recipe Manager</h1>
              <p className="lead mb-4">
                Discover, create, and organize your favorite recipes in one
                place. From quick weeknight dinners to elaborate weekend feasts,
                we've got you covered with our collection of delicious recipes.
              </p>
              <Link to="/recipes" className="btn btn-light btn-lg">
                Explore All Recipes
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Featured recipes section */}
      <Row className="mb-4">
        <Col>
          <h2 className="mb-4">Featured Recipes</h2>

          {/* Show loading spinner while fetching recipes */}
          {isLoading && <LoadingSpinner />}

          {/* Show error message if there's an error */}
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {/* Show featured recipes if loaded successfully */}
          {!isLoading && !error && (
            <Row xs={1} md={3} className="g-4">
              {featuredRecipes.map((recipe) => (
                <Col key={recipe.id}>
                  <RecipeCard
                    recipe={recipe}
                    onFavoriteToggle={handleFavoriteToggle}
                  />
                </Col>
              ))}
            </Row>
          )}

          {/* Show message if no recipes are available */}
          {!isLoading && !error && featuredRecipes.length === 0 && (
            <div className="text-center py-5">
              <p className="text-muted">No recipes available yet.</p>
              <Link to="/recipes" className="btn btn-primary">
                View All Recipes
              </Link>
            </div>
          )}
        </Col>
      </Row>

      {/* Features section */}
      <Row className="mb-5">
        <Col>
          <h2 className="mb-4">Why Choose Recipe Manager?</h2>
          <Row xs={1} md={3} className="g-4">
            <Col>
              <Card className="h-100 text-center">
                <Card.Body>
                  <h3 className="h5">📝 Easy Recipe Creation</h3>
                  <p className="text-muted">
                    Create and save your favorite recipes with our simple form.
                    Add ingredients, instructions, and cooking times in minutes.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="h-100 text-center">
                <Card.Body>
                  <h3 className="h5">❤️ Favorite Recipes</h3>
                  <p className="text-muted">
                    Mark your favorite recipes with a heart icon. Quickly find
                    and access your most-loved dishes.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="h-100 text-center">
                <Card.Body>
                  <h3 className="h5">📱 Responsive Design</h3>
                  <p className="text-muted">
                    Access your recipes on any device. Our app works perfectly
                    on desktop, tablet, and mobile.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default HomePage;
