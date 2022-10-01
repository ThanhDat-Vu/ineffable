import { createBrowserRouter } from "react-router-dom";
import {
  Home,
  Recipe,
  Ingredient,
  CocktailList,
  IngredientList,
} from "../views";
import { getCocktailByID, getRandomCocktail } from "../API/CocktailAPI";
import {
  getIngredientByName,
  listAllIngredientNames,
} from "../API/IngredientAPI";

// TODO: change "drink" to "cocktail" to preserve consistency
async function cocktailLoader({ params }) {
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
  // Cocktail
  {
    path: "cocktails",
    element: <CocktailList />,
  },
  {
    path: "cocktails/random",
    loader: async () => await getRandomCocktail(),
    element: <Recipe />,
  },
  {
    path: "cocktails/:id",
    loader: cocktailLoader,
    element: <Recipe />,
  },
  {
    path: "cocktails/search/:keyword",
    element: <CocktailList />,
  },
  {
    path: "categories/:category",
    element: <CocktailList />,
  },
  // Ingredient
  {
    path: "ingredients",
    element: <IngredientList />,
    loader: async () => await listAllIngredientNames(),
  },
  {
    path: "ingredients/:name",
    loader: async ({ params }) => {
      return await getIngredientByName(params.name);
    },
    element: <Ingredient />,
  },
  {
    path: "ingredients/search/:keyword",
    element: <IngredientList />,
    loader: async ({ params }) => {
      return await getIngredientByName(params.keyword);
    },
  },
]);

export default router;
