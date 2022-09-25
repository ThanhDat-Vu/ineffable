export async function getCocktailByID(id) {
  const res = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const data = await res.json();
  // console.log(data.drinks);
  return data.drinks ? data.drinks[0] : {};
}

export async function searchCocktailsByName(name) {
  const res = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`
  );
  return await res.json();
}

export async function listCocktailsByFirstLetter(firstLetter) {
  const res = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`
  );
  const data = await res.json();
  return data.drinks || [];
}

export async function listAllCocktails() {
  let allCocktails = [];
  for (let i of "12345679abcdefghijklmnopqrstvwyz") {
    let cocktails = await listCocktailsByFirstLetter(i);
    allCocktails = [...allCocktails, ...cocktails];
  }
  return allCocktails;
}

export async function listCocktailsByIngredient(ingredient) {
  const res = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  const data = await res.json();
  console.log(data);
  return data.drinks || [];
}

export async function getPopularCocktails() {
  const popularCocktails = [];
  for (let i = 0; i < 8; i++) {
    let cocktail = await getCocktailByID(`1100${i}`);
    popularCocktails.push(cocktail);
  }
  return popularCocktails;
}