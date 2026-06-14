import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout.jsx";
import { LandingPage } from "../pages/LandingPage.jsx";
import { DriverPage } from "../pages/mobile/DriverPage.jsx";
import { DashboardPage } from "../pages/dashboard/DashboardPage.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "driver", element: <DriverPage /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "*", element: <Navigate to="/" replace /> }
    ]
  }
]);
