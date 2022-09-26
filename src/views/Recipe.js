import Layout from "../components/Layout";
import { Link, useLoaderData } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import { useEffect, useState } from "react";
import { getIngredientByName } from "../API/IngredientAPI";
import IngredientCard from "../components/IngredientCard";
import Carousel from "../components/Carousel";
import Breadcrumb from "../components/Breadcrumb";

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
  }, [recipe]);

  return (
    <Layout>
      <div className="w-full xl:w-max xl:mx-auto px-8 xl:px-0 my-24 lg:my-32">
        <Breadcrumb intermediate="Cocktails" current={recipe.strDrink} />
        {/* Special Layout */}
        <div className="relative">
          {/* Title */}
          <div className="w-max lg:w-full mx-auto">
            <h2 className="text-gold text-xl lg:text-2xl font-bold mx-auto lg:ml-64 mt-8 mb-4 lg:my-8">
              {recipe.strDrink}
            </h2>
          </div>

          {/* Drink Image */}
          {/* Special Layout: Top-Right to Top */}
          <div className="image first-letter:w-max mx-auto lg:absolute top-8 right-0">
            <RecipeCard
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
              <div className="flex flex-col lg:flex-row">
                <h3 className="w-64 text-sm lg:text-lg font-bold mb-4">
                  Glass
                </h3>
                <p>Serve: {recipe.strGlass}</p>
              </div>

              {/* Instructions */}
              <div className="flex flex-col lg:flex-row my-12 lg:mt-8 lg:mb-0">
                <h3 className="w-64 text-sm lg:text-lg font-bold mb-2">
                  Instructions
                </h3>
                <ol className="w-96 xl:w-[32rem] leading-6 lg:leading-8 space-y-2">
                  {recipe.strInstructions.match(/[^.]+\./g)?.map((step, i) => (
                    <li key={i}>{`${i + 1}. ${step}`}</li>
                  ))}
                </ol>
              </div>
            </div>
            {/* Special Layout: Bot to Mid */}
            {/* Ingredients */}
            <div className="mt-12 mb-8">
              <h3 className="w-64 text-sm lg:text-lg font-bold">Ingredients</h3>
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
          <div className="flex flex-col lg:flex-row mb-12">
            <h3 className="w-64 text-sm lg:text-lg font-bold mb-4">Tags</h3>
            <p>
              {recipe.strTags?.split(/(?<=,)/).map((tag, i) => (
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
