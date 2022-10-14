import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { getIngredientByName } from "../API/IngredientAPI";
import {
  Layout,
  Breadcrumb,
  CocktailCard,
  IngredientCard,
  Carousel,
} from "../components";

export default function Recipe() {
  const recipe = useLoaderData();
  // Ingredients Loader
  const [ingredients, setIngredients] = useState([]);
  useEffect(() => {
    async function getIngredients() {
      let temp = [];
      for (let i = 1; recipe[`strIngredient${i}`]; i++) {
        let description =
          (recipe[`strMeasure${i}`] || "") + recipe[`strIngredient${i}`];

        let res = await getIngredientByName(recipe[`strIngredient${i}`]);
        temp.push({ ...res, description: description });
      }
      return temp;
    }

    getIngredients().then((res) => setIngredients(res));
  }, [recipe]);

  return (
    <Layout title={recipe.strDrink} desc={`${recipe.strDrink} recipe`}>
      <div className="w-max mx-auto my-24 lg:my-32">
        <Breadcrumb pathLabel={`Home / Cocktails / ${recipe.strDrink}`} />
        {/* Special Layout */}
        <div className="relative">
          {/* Title */}
          <div className="w-max mx-auto my-8 lg:ml-64">
            <h2 className="text-gold text-xl sm:text-2xl font-bold">
              {recipe.strDrink}
            </h2>
          </div>

          {/* Drink Image */}
          {/* Special Layout: Top-Right to Top */}
          <div className="w-max mx-auto lg:absolute top-16 right-0">
            <CocktailCard
              recipe={recipe}
              withCaption={false}
              className="w-56 h-56 lg:w-64 lg:h-64"
            />
          </div>

          <div className="flex flex-col-reverse lg:flex-col">
            {/* Special Layout: Top-Left to Bot */}
            {/* Recipe */}
            <div className="lg:mr-64 lg:pr-8">
              {/* Glass */}
              <div className="flex flex-col lg:flex-row items-baseline">
                <h3 className="w-64 text-sm sm:text-lg font-bold mb-4 lg:mb-0">
                  Glass
                </h3>
                <p>Serve: {recipe.strGlass}</p>
              </div>

              {/* Instructions */}
              <div className="flex flex-col lg:flex-row my-12 lg:mt-8 lg:mb-0">
                <h3 className="w-64 text-sm sm:text-lg font-bold mb-4 lg:mb-0">
                  Instructions
                </h3>
                <ol className="w-80 sm:w-[28rem] lg:min-h-[12rem] lg:w-96 xl:w-[32rem] leading-6 lg:leading-8 space-y-2">
                  {recipe.strInstructions.match(/[^.]+\./g)?.map((step, i) => (
                    <li key={i}>{`${i + 1}. ${step}`}</li>
                  ))}
                </ol>
              </div>
            </div>
            {/* Special Layout: Bot to Mid */}
            {/* Ingredients */}
            <div className="mt-4 mb-8">
              <h3 className="w-64 text-sm sm:text-lg font-bold mb-4 lg:mb-0">
                Ingredients
              </h3>
              {/* Carousel */}
              <Carousel>
                {ingredients.map((ingredient, i) => (
                  <IngredientCard
                    key={i}
                    ingredientName={ingredient.strIngredient}
                    description={ingredient.description}
                  />
                ))}
              </Carousel>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-col lg:flex-row mb-12">
            <h3 className="w-64 text-sm sm:text-lg font-bold mb-4 lg:mb-0">
              Tags
            </h3>
            <p className="w-80 sm:w-max flex flex-wrap leading-6">
              {recipe.strTags?.split(",").map((tag, i) => (
                <Link key={i} className="italic">
                  {tag};&nbsp;
                </Link>
              ))}
            </p>
          </div>
        </div>

        {/* MidNav */}
        <div className="flex">
          {recipe.prevCocktail && (
            <Link
              to={`/cocktails/${parseInt(recipe.idDrink, 10) - 1}`}
              // reloadDocument
              className="italic"
            >
              {"<< " + recipe.prevCocktail}
            </Link>
          )}
          {recipe.nextCocktail && (
            <Link
              to={`/cocktails/${parseInt(recipe.idDrink, 10) + 1}`}
              // reloadDocument
              className="block w-max ml-auto text-right italic"
            >
              {recipe.nextCocktail + " >>"}
            </Link>
          )}
        </div>
      </div>
    </Layout>
  );
}
