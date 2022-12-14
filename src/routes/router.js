import { createBrowserRouter } from "react-router-dom";
import {
  Home,
  Recipe,
  Ingredient,
  IngredientList,
  AllCocktails,
  CocktailSearch,
  Category,
} from "../views";
import { getCocktailByID, getRandomCocktail } from "../API/CocktailAPI";
import {
  getIngredientByName,
  listAllIngredientNames,
} from "../API/IngredientAPI";

async function cocktailLoader({ params }) {
  let recipe = await getCocktailByID(params.id);
  let prevCocktail = await getCocktailByID(parseInt(params.id, 10) - 1);
  let nextCocktail = await getCocktailByID(parseInt(params.id, 10) + 1);
  return {
    ...recipe,
    prevCocktail: prevCocktail.strDrink,
    nextCocktail: nextCocktail.strDrink,
  };
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  // Cocktail
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
    path: "cocktails",
    element: <AllCocktails />,
  },
  {
    path: "cocktails/search",
    element: <CocktailSearch />,
  },
  {
    path: "categories/",
    element: <AllCocktails />,
  },
  {
    path: "categories/:category",
    element: <Category />,
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
    path: "ingredients/search",
    element: <IngredientList />,
    loader: async () => await listAllIngredientNames(),
  },
]);

export default router;
