export async function listAllIngredientNames() {
  const res = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`
  );
  const data = await res.json();
  return data.drinks.sort((a, b) =>
    a.strIngredient1.localeCompare(b.strIngredient1)
  );
}

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

export async function getIngredientByName(name) {
  const res = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${name}`
  );
  const data = await res.json();
  return data.ingredients[0];
}

export function getIngredientImageUrl(name) {
  return `https://www.thecocktaildb.com/images/ingredients/${name}.png`;
}
