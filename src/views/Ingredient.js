import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { listCocktailsByIngredient } from "../API/CocktailAPI";
import { getIngredientImageUrl } from "../API/IngredientAPI";
import Breadcrumb from "../components/Breadcrumb";
import Layout from "../components/Layout";
import RecipeCard from "../components/RecipeCard";

export default function Ingredient() {
  const ingredient = useLoaderData();

  const [drinks, setDrinks] = useState([]);
  useEffect(() => {
    listCocktailsByIngredient(ingredient.strIngredient).then((res) =>
      setDrinks(res)
    );
  }, [ingredient]);

  return (
    <Layout>
      <div className="w-full md:w-max md:mx-auto px-8 xl:px-0 my-24 lg:my-32">
        <Breadcrumb
          intermediate="Ingredients"
          current={ingredient.strIngredient}
        />

        {/* Title */}
        <div className="w-max lg:w-full mx-auto">
          <h2 className="text-gold text-xl lg:text-2xl font-bold mx-auto lg:ml-64 mt-8 mb-4 lg:my-8">
            {ingredient.strIngredient}
          </h2>
        </div>

        <div className="flex flex-col-reverse lg:flex-row">
          <div>
            {/* Type */}
            <div className="flex flex-col lg:flex-row">
              <h3 className="w-64 text-sm lg:text-lg font-bold mb-4">Type</h3>
              <p>{ingredient.strType}</p>
            </div>

            {/* Description */}
            <div className="flex flex-col lg:flex-row my-12">
              <h3 className="w-64 text-sm lg:text-lg font-bold mb-4">
                Description
              </h3>

              <div className="w-full md:w-[32rem]">
                {ingredient.strDescription ? (
                  <>
                    <p className="h-48 leading-8 text-clip overflow-hidden text-justify">
                      {ingredient.strDescription}
                    </p>

                    <button className="italic">...Read more</button>
                  </>
                ) : (
                  <p>No description</p>
                )}
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="w-56 mx-auto lg:ml-8">
            <img
              src={getIngredientImageUrl(ingredient.strIngredient)}
              alt={ingredient.strIngredient}
              className="w-full"
            />
          </div>
        </div>

        {/* Drinks */}
        <div>
          <h3 className="w-64 text-sm lg:text-lg font-bold mb-8">Drinks</h3>
          <div className="w-max mx-auto grid grid-cols-2 lg:grid-cols-4 gap-x-10 sm:gap-x-24 gap-y-12 sm:gap-y-20">
            {drinks?.map((recipe) => (
              <RecipeCard
                key={recipe.idDrink}
                recipe={recipe}
                className="w-32 sm:w-48 h-32 sm:h-48"
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
