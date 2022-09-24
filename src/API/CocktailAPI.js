export async function getCocktailByID(id) {
  const res = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const data = await res.json();
  console.log(data);
  return data.drinks ? data.drinks[0] : {};
}

export async function getPopularCocktails() {
  const popularCocktails = [];
  for (let i = 0; i < 8; i++) {
    let cocktail = await getCocktailByID(`1100${i}`);
    popularCocktails.push(cocktail);
  }
  return popularCocktails;
}
