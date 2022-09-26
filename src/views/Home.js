import Layout from "../components/Layout";
import { BsArrowDown } from "react-icons/bs";
import Dropdown from "../components/Dropdown";
import { useState, useEffect } from "react";
import { getPopularCocktails } from "../API/CocktailAPI";
import { getPopularIngredients } from "../API/IngredientAPI";
import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import IngredientCard from "../components/IngredientCard";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  // Get Homepage Data
  const [popularDrinks, setPopularDrinks] = useState(() => {
    const sessionData = sessionStorage.getItem("popularDrinks");
    return sessionData ? JSON.parse(sessionData) : [];
  });
  const [popularIngredients, setPopularIngredients] = useState(() => {
    const sessionData = sessionStorage.getItem("popularIngredients");
    return sessionData ? JSON.parse(sessionData) : [];
  });
  useEffect(() => {
    if (!popularDrinks.length) {
      getPopularCocktails().then((res) => {
        setPopularDrinks(res);
        sessionStorage.setItem("popularDrinks", JSON.stringify(res));
      });
    }
    if (!popularIngredients.length) {
      getPopularIngredients().then((res) => {
        setPopularIngredients(res);
        sessionStorage.setItem("popularIngredients", JSON.stringify(res));
      });
    }
  }, [
    popularDrinks,
    setPopularDrinks,
    popularIngredients,
    setPopularIngredients,
  ]);

  return (
    <Layout>
      {/* Hero Section */}
      <div className="h-screen bg-hero-image bg-[length:auto_100%] sm:bg-cover bg-center bg-fixed relative">
        {/* Overlay */}
        <div className="w-full h-full bg-rich-black opacity-60"></div>

        {/* Quote */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2">
          <div className="w-max border-l-2 pl-4 sm:pl-8 text-sm sm:text-xl">
            <p>Searching for moments that are</p>
            <p className="font-bold">
              too great or extreme <br className="md:hidden" />
              to be expressed or described in words
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="w-full absolute top-[40%] flex flex-col items-center">
          {/* Intro */}
          <p className="w-[22rem] sm:w-96 md:w-full text-center mb-4">
            Welcome, stranger! In this place, you can find almost every
            flavorsome cocktail recipe in the world!
          </p>

          {/* Search Bar */}
          <form className="mb-20 sm:mb-24 flex flex-col sm:flex-row">
            <input
              type="text"
              name="keyword"
              placeholder="Which drinks you would like to make?"
              className="w-80 md:w-96 lg:w-[32rem] bg-white/10 p-3 backdrop-blur shadow-glass sm:mr-2 mb-2 sm:mb-0 focus:outline-0 focus:bg-white/20"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            ></input>

            {/* Custom Select */}
            <div className="flex space-x-2">
              <div className="grow sm:w-40">
                <Dropdown
                  options={["Cocktail", "Ingredient"]}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                  className="bg-white/10 p-3 backdrop-blur shadow-glass focus:bg-white/20"
                  menuClassName="top-10 sm:top-12 bg-white/20 backdrop-blur shadow-glass"
                  itemClassName="p-3 hover:bg-white/10"
                />
              </div>

              <button className="text-rich-black font-bold bg-shiny-gold px-8 py-3 hover:brightness-125">
                Search
              </button>
            </div>
          </form>

          {/* Random */}
          <p>Don’t tknow what to look for?</p>
          <Link
            to="/drinks/random"
            className="font-bold text-rich-black bg-gray-400 px-8 py-3 mt-2 hover:brightness-125"
          >
            Give me anything
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute top-[92%] w-full text-xl animate-bounce">
          <BsArrowDown className="mx-auto" />
        </div>
      </div>

      {/* Popular Cocktails */}
      <div className="w-max mx-auto py-16">
        <h2 className="text-sm sm:text-xl text-gold font-bold mb-6 sm:mb-8">
          Popular Cocktails
        </h2>
        <div className="w-max grid grid-cols-2 lg:grid-cols-4 gap-x-10 sm:gap-x-16 xl:gap-x-32 gap-y-12 sm:gap-y-20 xl:gap-y-24">
          {popularDrinks?.map((recipe) => (
            <RecipeCard
              key={recipe.idDrink}
              recipe={recipe}
              className="w-32 sm:w-48 h-32 sm:h-48"
            />
          ))}
        </div>
        <Link
          to="/cocktails"
          className="block text-center italic mt-12 sm:mt-16"
        >
          All Cocktails &gt;&gt;
        </Link>
      </div>

      {/* Quote */}
      <div className="w-40 sm:w-56 h-16 sm:h-24 mx-auto border-y sm:border-y-2 border-golden sm:my-12">
        <q className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max text-center font-semibold italic text-gold tracking-wide">
          Every empty bottle is filled with a great story
        </q>
      </div>

      {/* Popular Ingredients */}
      <div className="w-max mx-auto py-16">
        <h2 className="text-sm sm:text-xl text-gold font-bold mb-6 sm:mb-8">
          Popular Ingredients
        </h2>
        <div className="w-max grid grid-cols-2 lg:grid-cols-4 gap-x-10 sm:gap-x-16 xl:gap-x-32 gap-y-12 sm:gap-y-20 xl:gap-y-24">
          {popularIngredients.map((ingredient) => (
            <IngredientCard
              key={ingredient.idIngredient}
              ingredient={ingredient}
              description={ingredient.strIngredient}
            />
          ))}
        </div>
        <Link to="/" className="block text-center italic mt-12 sm:mt-16">
          All Ingredients &gt;&gt;
        </Link>
      </div>
    </Layout>
  );
}
