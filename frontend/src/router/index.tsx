import { createBrowserRouter } from "react-router-dom";
import publicRoutes from "./routes/publicRoutes";
import NotFound from "../pages/public/NotFound";

const notFoundRoute = [{ path: "*", element: <NotFound /> }];

export const router = createBrowserRouter([...publicRoutes, ...notFoundRoute]);
