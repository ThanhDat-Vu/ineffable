import { createBrowserRouter } from "react-router-dom";
import Home from "../views/Home";
import Recipe from "../views/Recipe";
import { getCocktailByID } from "../API/CocktailAPI";
import { ErrorBoundary } from "../components/ErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "drinks/:id",
    loader: ({ params }) => getCocktailByID(params.id),
    element: <Recipe />,
    errorElement: <ErrorBoundary />,
  },
]);

export default router;
