import { createBrowserRouter, Navigate } from "react-router-dom";

import App from "../App";

import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";

import ProtectedRoute from "./protectedRoute.jsx";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><App /></ProtectedRoute>,
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/register',
    element:<Register/>
  },

]);

export default Router;
