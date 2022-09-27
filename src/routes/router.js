import { createBrowserRouter } from "react-router-dom";
import Home from "../views/Home";
import Recipe from "../views/Recipe";
import { getCocktailByID, getRandomCocktail } from "../API/CocktailAPI";
import { ErrorBoundary } from "../components/ErrorBoundary";
import Ingredient from "../views/Ingredient";
import { getIngredientByName } from "../API/IngredientAPI";
import CocktailList from "../views/CocktailList";
import IngredientList from "../views/IngredientList";

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

async function randomLoader() {
  return await getRandomCocktail();
}

async function ingredientLoader({ params }) {
  return await getIngredientByName(params.name);
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
  {
    path: "ingredients/:name",
    loader: ingredientLoader,
    element: <Ingredient />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "drinks/random",
    loader: randomLoader,
    element: <Recipe />,
  },
  {
    path: "cocktails",
    element: <CocktailList />,
  },
  {
    path: "ingredients",
    element: <IngredientList />,
  },
]);

export default router;
