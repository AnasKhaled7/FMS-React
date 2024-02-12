import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthLayout, RootLayout } from "./components";
import {
  Login,
  Register,
  ForgotPassword,
  Home,
  Recipes,
  Categories,
  Users,
  NotFound,
} from "./modules";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forgot-password", element: <ForgotPassword /> },
      ],
    },
    {
      path: "/dashboard",
      element: <RootLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "categories", element: <Categories /> },
        { path: "recipes", element: <Recipes /> },
        { path: "users", element: <Users /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
