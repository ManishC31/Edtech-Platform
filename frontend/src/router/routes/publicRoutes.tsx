import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import LoginPage from "../../pages/public/LoginPage";
import RegisterPage from "../../pages/public/RegisterPage";

const LandingPage = lazy(() => import("../../pages/public/LandingPage"));
const UnauthorizedPage = lazy(() => import("../../pages/public/UnauthorizedPage"));

const publicRoutes: RouteObject[] = [
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/unauthorized", element: <UnauthorizedPage /> },
];

export default publicRoutes;
