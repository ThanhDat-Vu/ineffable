import Layout from "../components/Layout";
import { Link, useLoaderData } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import { useEffect, useState } from "react";
import { getIngredientByName } from "../API/IngredientAPI";
import IngredientCard from "../components/IngredientCard";
import Carousel from "../components/Carousel";

export default function Recipe() {
  const recipe = useLoaderData();
  console.log(recipe);
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
    <Layout>
      <div className="w-full sm:w-max sm:mx-auto px-8 sm:px-0 my-24 sm:my-32">
        {/* Breadcrumb */}
        <div className="w-max mx-auto sm:w-auto italic text-gray-400">
          <Link to="/" className="hover:text-white">
            Home
          </Link>
          /
          <Link to="/cocktails" className="hover:text-white">
            Cocktails
          </Link>
          /
          <Link to="." className="text-white">
            {recipe.strDrink}
          </Link>
        </div>
        {/* Special Layout */}
        <div className="relative">
          {/* Title */}
          <div className="w-max sm:w-full mx-auto">
            <h2 className="text-gold text-xl sm:text-2xl font-bold mx-auto sm:ml-64 mt-8 mb-4 sm:my-8">
              {recipe.strDrink}
            </h2>
          </div>

          {/* Drink Image */}
          {/* Special Layout: Top-Right to Top */}
          <div className="w-max mx-auto sm:absolute top-8 right-0">
            <RecipeCard
              recipe={recipe}
              withCaption={false}
              className="w-56 h-56 sm:w-64 sm:h-64"
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-col">
            {/* Special Layout: Top-Left to Bot */}
            {/* Recipe */}
            <div className="sm:mr-64">
              {/* Glass */}
              <div className="flex flex-col sm:flex-row">
                <h3 className="w-64 text-sm sm:text-lg font-bold mb-4">
                  Glass
                </h3>
                <p>Serve: {recipe.strGlass}</p>
              </div>

              {/* Instructions */}
              <div className="flex flex-col sm:flex-row my-12 sm:mt-8 sm:mb-0">
                <h3 className="w-64 text-sm sm:text-lg font-bold mb-2">
                  Instructions
                </h3>
                <ol className="max-w-full leading-6 sm:leading-8 space-y-2">
                  {recipe.strInstructions.match(/[^.]+\./g).map((step, i) => (
                    <li key={i}>{`${i + 1}. ${step}`}</li>
                  ))}
                </ol>
              </div>
            </div>
            {/* Special Layout: Bot to Mid */}
            {/* Ingredients */}
            <div className="mt-12 mb-4">
              <h3 className="w-64 text-sm sm:text-lg font-bold">Ingredients</h3>
              {/* Carousel */}
              <Carousel>
                {ingredients.map((ingredient) => (
                  <IngredientCard
                    key={ingredient.idIngredient}
                    ingredient={ingredient}
                    description={ingredient.description}
                  />
                ))}
              </Carousel>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-col sm:flex-row mb-12">
            <h3 className="w-64 text-sm sm:text-lg font-bold mb-4">Tags</h3>
            <p>
              {recipe.strTags.split(/(?<=,)/).map((tag, i) => (
                <Link key={i} className="italic">
                  {tag}&nbsp;
                </Link>
              ))}
            </p>
          </div>
        </div>

        {/* MidNav */}
        <div className="flex">
          {recipe.strPrevDrink && (
            <Link
              to={`/drinks/${parseInt(recipe.idDrink, 10) - 1}`}
              className="italic"
            >
              {"<< " + recipe.strPrevDrink}
            </Link>
          )}
          {recipe.strNextDrink && (
            <Link
              to={`/drinks/${parseInt(recipe.idDrink, 10) + 1}`}
              className="block w-max ml-auto text-right italic"
            >
              {recipe.strNextDrink + " >>"}
            </Link>
          )}
        </div>
      </div>
    </Layout>
  );
}
