import Layout from "../components/Layout";
import { Link, useLoaderData } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import { useEffect, useState } from "react";
import { getIngredientByName } from "../API/IngredientAPI";
import IngredientCard from "../components/IngredientCard";
import Carousel from "../components/Carousel";

export default function Recipe() {
  const recipe = useLoaderData();
  // console.log(recipe);
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
    // setIngredients(res);
  }, [recipe]);

  return (
    <Layout>
      <div className="mx-40 my-32">
        {/* Breadcrumb */}
        <div className="italic text-gray-400">
          <Link to="/" className="hover:text-white">
            Home
          </Link>
          /
          <Link to="/" className="hover:text-white">
            Cocktail
          </Link>
          /
          <Link to="." className="text-white">
            {recipe.strDrink}
          </Link>
        </div>
        <div className="flex my-8">
          <div className="grow space-y-8">
            <h2 className="text-gold text-xl font-bold ml-64">
              {recipe.strDrink}
            </h2>
            <div className="flex">
              <h3 className="w-64 font-bold">Glass</h3>
              <p>{recipe.strGlass}</p>
            </div>
            <div className="flex">
              <h3 className="w-64 font-bold">Instructions</h3>
              <ol>
                {recipe.strInstructions.match(/[^.]+\./g).map((step, i) => (
                  <li key={i}>{`${i + 1}. ${step}`}</li>
                ))}
              </ol>
            </div>
            <div>
              <h3 className="w-64 font-bold">Ingredients</h3>
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
          <div>
            <RecipeCard recipe={recipe} withCaption={false} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
