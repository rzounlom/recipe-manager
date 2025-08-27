import AllRecipesPage from "./pages/AllRecipesPage";
import ContactPage from "./pages/ContactPage";
// Import all the page components we'll create
import HomePage from "./pages/HomePage";
// Import the layout component that will wrap all pages
import Layout from "./components/Layout";
import SingleRecipePage from "./pages/SingleRecipePage";
// Import React Router components for navigation
import { createBrowserRouter } from "react-router-dom";

// Create the router configuration
// This defines all the routes in our application
export const router = createBrowserRouter([
  {
    // Root path that wraps all pages with our Layout component
    path: "/",
    element: <Layout />,
    // Child routes that will be rendered inside the Layout
    children: [
      {
        // Home page route - this is the default page when someone visits our app
        index: true,
        element: <HomePage />,
      },
      {
        // All recipes page - shows a list of all recipes
        path: "recipes",
        element: <AllRecipesPage />,
      },
      {
        // Single recipe page - shows details of one specific recipe
        // The :id part is a URL parameter that will contain the recipe ID
        path: "recipes/:id",
        element: <SingleRecipePage />,
      },
      {
        // Contact page - shows contact information
        path: "contact",
        element: <ContactPage />,
      },
    ],
  },
]);
