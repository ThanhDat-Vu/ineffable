import { createBrowserRouter } from "react-router-dom";
import Home from "../views/Home";
import Recipe from "../views/Recipe";
import { getCocktailByID } from "../API/CocktailAPI";
import { ErrorBoundary } from "../components/ErrorBoundary";

async function drinkLoader({ params }) {
  let recipe = await getCocktailByID(params.id);
  let prevDrink = await getCocktailByID(parseInt(params.id, 10) - 1);
  let nextDrink = await getCocktailByID(parseInt(params.id, 10) + 1);
  return {
    ...recipe,
    strPrevDrink: prevDrink.strDrink,
    strNextDrink: nextDrink.strDrink,
  };
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "drinks/:id",
    loader: drinkLoader,
    element: <Recipe />,
    errorElement: <ErrorBoundary />,
  },
]);

export default router;
