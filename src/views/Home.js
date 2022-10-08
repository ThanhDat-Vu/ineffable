import menu from "../static/menu";
import { getPopularCocktails } from "../API/CocktailAPI";
import { getPopularIngredients } from "../API/IngredientAPI";
import useSession from "../hooks/useSession";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Layout,
  SearchBox,
  Dropdown,
  CocktailCard,
  IngredientCard,
} from "../components";
import { BsArrowDown } from "react-icons/bs";

export default function Home() {
  // Get Homepage Data
  const popularCocktails = useSession("popularCocktails", getPopularCocktails);
  const popularIngredients = useSession(
    "popularIngredients",
    getPopularIngredients
  );

  // Search Form Actions
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  function handleSearch(e) {
    e.preventDefault();
    let keyword = e.target.keyword.value;
    navigate(`/${index == 0 ? "cocktails" : "ingredients"}/search/${keyword}`);
  }

  return (
    <Layout>
      {/* Hero Section */}
      <div className="h-screen bg-hero-image bg-[length:auto_100%] sm:bg-cover bg-center bg-fixed relative">
        {/* Overlay */}
        <div className="w-full h-full bg-rich-black opacity-70"></div>

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
        <div className="absolute top-[40%] w-full flex flex-col items-center">
          {/* Intro */}
          <p className="w-[22rem] sm:w-96 md:w-full mb-4 text-center">
            Welcome, stranger! In this place, you can find almost every
            flavorsome cocktail recipe in the world!
          </p>

          {/* Search Bar */}
          <form
            className="mb-20 sm:mb-24 flex flex-col md:flex-row"
            onSubmit={(e) => handleSearch(e)}
          >
            <SearchBox index={index} />

            <div className="flex space-x-2">
              <div className="grow w-40">
                <Dropdown
                  menu={menu}
                  index={index}
                  setIndex={setIndex}
                  styles={{
                    fieldStyle:
                      "bg-white/10 focus:bg-white/20 p-3 backdrop-blur shadow-glass",
                    menuStyle: "w-full bg-white/10 backdrop-blur shadow-glass",
                    optionStyle: "p-3 hover:bg-white/10",
                  }}
                />
              </div>

              <button className="w-32 text-rich-black font-bold bg-shiny-gold py-2 hover:brightness-125">
                Search
              </button>
            </div>
          </form>

          {/* Random */}
          <p>Not sure what to look for?</p>
          <Link
            to="/cocktails/random"
            className="bg-gray-400 px-8 py-3 mt-2 hover:brightness-125 font-bold text-rich-black"
          >
            Give me anything
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute top-[92%] w-full animate-bounce  text-xl">
          <BsArrowDown className="mx-auto" />
        </div>
      </div>

      {/* Popular Cocktails */}
      <div className="w-max mx-auto mt-16 sm:mt-24">
        <h2 className="text-sm sm:text-xl text-gold font-bold mb-6 sm:mb-8">
          Popular Cocktails
        </h2>
        <div className="w-max grid grid-cols-2 lg:grid-cols-4 gap-x-12 sm:gap-x-16 xl:gap-x-32 gap-y-6 sm:gap-y-12 xl:gap-y-16">
          {popularCocktails.length
            ? popularCocktails.map((recipe) => (
                <CocktailCard
                  key={recipe.idDrink}
                  recipe={recipe}
                  className="w-32 sm:w-48 h-32 sm:h-48"
                />
              ))
            : [...Array(8).keys()].map((i) => (
                <CocktailCard
                  key={i}
                  recipe={null}
                  className="w-32 sm:w-48 h-32 sm:h-48"
                />
              ))}
        </div>
        <Link
          to="/cocktails"
          className="block w-max mx-auto px-2 mt-4 sm:mt-10 text-center italic"
        >
          All Cocktails &gt;&gt;
        </Link>
      </div>

      {/* Quote */}
      <div className="w-40 sm:w-56 h-16 sm:h-24 mx-auto border-y sm:border-y-2 border-golden my-24 sm:my-32">
        <q className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max text-center font-semibold italic text-gold tracking-wide">
          Every empty bottle is filled with a great story
        </q>
      </div>

      {/* Popular Ingredients */}
      <div className="w-max mx-auto">
        <h2 className="text-sm sm:text-xl text-gold font-bold mb-6 sm:mb-8">
          Popular Ingredients
        </h2>
        <div className="w-max grid grid-cols-2 lg:grid-cols-4 gap-x-12 sm:gap-x-16 xl:gap-x-32 gap-y-12">
          {popularIngredients.length
            ? popularIngredients.map((ingredient) => (
                <IngredientCard
                  key={ingredient.idIngredient}
                  ingredientName={ingredient.strIngredient}
                />
              ))
            : [...Array(4).keys()].map((i) => (
                <IngredientCard key={i} className="w-32 sm:w-48 h-32 sm:h-48" />
              ))}
        </div>
        <Link
          to="/ingredients"
          className="block w-max mx-auto px-2 mt-8 sm:mt-12 text-center italic"
        >
          All Ingredients &gt;&gt;
        </Link>
      </div>
    </Layout>
  );
}
