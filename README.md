# Recipe Manager App

A modern React TypeScript application for managing recipes, built as a learning tool for beginner developers.

## 🚀 Features

- **4 Pages**: Home, All Recipes, Single Recipe, and Contact
- **Recipe Management**: Create, read, update, and delete recipes
- **Favorite System**: Toggle favorite status for recipes
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Built with React Bootstrap and React Icons
- **API Integration**: Uses JSON Server for backend simulation

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Routing**: React Router v6
- **Styling**: React Bootstrap
- **Icons**: React Icons
- **Backend**: JSON Server (for development)

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js (version 16 or higher)
- npm or yarn package manager

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd recipe-manager
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the JSON Server (Backend)

In one terminal window, start the JSON server:

```bash
npm run server
```

This will start the JSON server on `http://localhost:3001` with the sample recipe data.

### 4. Start the Development Server

In another terminal window, start the React development server:

```bash
npm run dev
```

This will start the application on `http://localhost:5173`.

### 5. Open the Application

Open your browser and navigate to `http://localhost:5173` to see the application running.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main layout with navbar
│   ├── Navbar.tsx      # Navigation bar
│   ├── RecipeCard.tsx  # Recipe display card
│   ├── LoadingSpinner.tsx # Loading indicator
│   └── NewRecipeModal.tsx # Modal for creating recipes
├── pages/              # Page components
│   ├── HomePage.tsx    # Home page with featured recipes
│   ├── AllRecipesPage.tsx # All recipes listing
│   ├── SingleRecipePage.tsx # Individual recipe view
│   └── ContactPage.tsx # Contact information
├── router.tsx          # React Router configuration
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## 🎯 Key Learning Concepts

This project demonstrates several important React and web development concepts:

### React Concepts

- **Functional Components**: All components use modern functional syntax
- **Hooks**: useState, useEffect for state management and side effects
- **Props**: Component communication and data passing
- **Event Handling**: User interactions and form submissions

### Routing

- **React Router v6**: Client-side routing with nested routes
- **URL Parameters**: Dynamic routing with recipe IDs
- **Navigation**: Programmatic navigation and link components

### State Management

- **Local State**: Component-level state with useState
- **API State**: Loading, error, and data states
- **Form State**: Controlled components for user input

### API Integration

- **Fetch API**: Modern JavaScript for HTTP requests
- **Async/Await**: Handling asynchronous operations
- **Error Handling**: Proper error states and user feedback

### UI/UX

- **Responsive Design**: Mobile-first approach with Bootstrap
- **Loading States**: User feedback during API calls
- **Modals**: Overlay dialogs for forms and confirmations
- **Icons**: Visual elements with React Icons

## 📝 API Endpoints

The JSON Server provides these RESTful endpoints:

- `GET /recipes` - Get all recipes
- `GET /recipes/:id` - Get a specific recipe
- `POST /recipes` - Create a new recipe
- `PUT /recipes/:id` - Update a recipe
- `PATCH /recipes/:id` - Partially update a recipe (for favorites)
- `DELETE /recipes/:id` - Delete a recipe

## 🎨 Customization

### Adding New Features

1. Create new components in the `components/` directory
2. Add new pages in the `pages/` directory
3. Update the router configuration in `router.tsx`
4. Add new API endpoints to `db.json` if needed

### Styling

- The app uses React Bootstrap for styling
- Custom CSS can be added to `src/index.css`
- Bootstrap classes are used throughout for responsive design

### Data Structure

The recipe data structure includes:

```typescript
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
```

## 🐛 Troubleshooting

### Common Issues

1. **JSON Server not starting**

   - Make sure port 3001 is not in use
   - Check that `db.json` exists in the root directory

2. **API calls failing**

   - Ensure JSON Server is running on port 3001
   - Check browser console for CORS errors

3. **Build errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check TypeScript configuration in `tsconfig.json`

## 📚 Learning Resources

- [React Documentation](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [React Bootstrap Documentation](https://react-bootstrap.github.io/)
- [JSON Server Documentation](https://github.com/typicode/json-server)

## 🤝 Contributing

This is a learning project, but contributions are welcome! Feel free to:

- Add new features
- Improve the UI/UX
- Fix bugs
- Add more detailed comments
- Create additional learning examples

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Happy coding! 🍳👨‍💻
