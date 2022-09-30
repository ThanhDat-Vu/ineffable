export async function searchCocktailByName(name) {
  const res = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`
  );
  const data = await res.json();
  return data.drinks;
}

export async function searchIngredientByName(name) {
  const res = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${name}`
  );
  const data = await res.json();
  return data.ingredients;
}
