import { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ToastContainer } from "react-toastify";
import { AuthLayout, ProtectedRoute, RootLayout } from "./components";
import {
  Login,
  Register,
  ForgotPassword,
  Home,
  Recipes,
  RecipeForm,
  Categories,
  Users,
  NotFound,
  ResetPassword,
  EmailConfirmation,
  Favorites,
} from "./modules";
import { UserContext } from "./context/UserContext";

const App = () => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);

  const saveUserData = () => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);
      setToken(token);
      setUserData(decodedToken);
    }
  };

  useEffect(() => {
    saveUserData();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login saveUserData={saveUserData} /> },
        { path: "login", element: <Login saveUserData={saveUserData} /> },
        { path: "register", element: <Register /> },
        { path: "email-confirmation", element: <EmailConfirmation /> },
        { path: "forgot-password", element: <ForgotPassword /> },
        { path: "reset-password", element: <ResetPassword /> },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <RootLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "categories", element: <Categories /> },
        {
          path: "recipes",
          children: [
            { index: true, element: <Recipes /> },
            { path: "add-recipe", element: <RecipeForm /> },
            { path: "edit-recipe/:id", element: <RecipeForm /> },
          ],
        },
        { path: "users", element: <Users /> },
        { path: "favorites", element: <Favorites /> },
      ],
    },
  ]);

  return (
    <UserContext.Provider value={{ userData, token }}>
      <ToastContainer position="bottom-right" />
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
};

export default App;
