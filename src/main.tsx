import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import Registration from "./pages/Registration.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css";
import RegistrationList from "./components/RegistrationList.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/registration", element: <Registration /> },
  { path: "/registration-list", element: <RegistrationList /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
