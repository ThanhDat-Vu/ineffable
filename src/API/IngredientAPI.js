export async function getIngredientByID(id) {
  const res = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=${id}`
  );
  const data = await res.json();
  return data.ingredients[0];
}

export async function getPopularIngredients() {
  const popularIngredients = [];
  for (let i = 1; i <= 4; i++) {
    let ingredient = await getIngredientByID(i);
    popularIngredients.push(ingredient);
  }
  return popularIngredients;
}

export function getIngredientImageUrl(name) {
  return `https://www.thecocktaildb.com/images/ingredients/${name}.png`;
}
