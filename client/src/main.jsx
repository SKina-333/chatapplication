import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { RouterProvider } from "react-router-dom";
import Router from "./routers/navRouter.jsx";

import { SocketProvider } from "./contexts/socketContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SocketProvider>
      <RouterProvider router={Router} />
    </SocketProvider>
  </StrictMode>
);
