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
  Categories,
  Users,
  NotFound,
  ResetPassword,
} from "./modules";

const App = () => {
  const [userData, setUserData] = useState(null);

  const saveUserData = () => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);
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
        { path: "forgot-password", element: <ForgotPassword /> },
        { path: "reset-password", element: <ResetPassword /> },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute userData={userData}>
          <RootLayout userData={userData} />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home userData={userData} /> },
        { path: "categories", element: <Categories /> },
        { path: "recipes", element: <Recipes /> },
        { path: "users", element: <Users /> },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer position="bottom-left" />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
