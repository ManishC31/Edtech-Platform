import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Suspense } from "react";

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
