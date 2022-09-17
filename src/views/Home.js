import Layout from "../components/Layout";
import { BsArrowDown } from "react-icons/bs";
import Dropdown from "../components/Dropdown";
import { useState, useEffect } from "react";
import { getPopularCocktails } from "../API/CocktailAPI";
import {
  getPopularIngredients,
  getIngredientImageUrl,
} from "../API/IngredientAPI";
import { Link } from "react-router-dom";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const [popularCocktails, setPopularCocktails] = useState([]);
  const [popularIngredients, setPopularIngredients] = useState([]);
  useEffect(() => {
    getPopularCocktails().then((res) => setPopularCocktails(res));
    getPopularIngredients().then((res) => setPopularIngredients(res));
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <div className="h-screen bg-hero-image bg-cover bg-center bg-fixed relative">
        {/* Overlay */}
        <div className="w-full h-full bg-rich-black opacity-60"></div>

        {/* Quote */}
        <div className="w-full absolute top-1/4 flex flex-col items-center">
          <div className="text-xl border-l-2 pl-8">
            <p>Searching for moments that are</p>
            <p className="font-bold">
              too great or extreme to be expressed or described in words
            </p>
          </div>
        </div>
        {/* Search */}
        <div className="w-full absolute top-[44%] flex flex-col items-center">
          <p>
            Welcome, stranger! In this place, you can find almost every
            flavorsome cocktail recipe in the world!
          </p>
          <form className="mt-2 mb-16 text-gray-200 space-x-2">
            <input
              type="text"
              name="keyword"
              placeholder="Which drinks you would like to make?"
              className="w-[32rem] p-3 bg-white/10 backdrop-blur shadow-glass focus:outline-0 focus:bg-white/20"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            ></input>
            {/* Custom Select */}
            <Dropdown
              options={["Cocktail", "Ingredient"]}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
            <button className="px-6 py-3 bg-shiny-gold text-rich-black font-bold hover:brightness-125">
              Search
            </button>
          </form>
          {/* Random */}
          <p>Don’t tknow what to look for?</p>
          <button className="px-6 py-3 mt-2 bg-gray-400 text-rich-black font-bold hover:brightness-125">
            Give me anything
          </button>
          <BsArrowDown className="mt-32 text-xl animate-bounce" />
        </div>
      </div>
      {/* Popular Cocktails */}
      <div className="py-16 w-max mx-auto space-y-8">
        <h2 className="gold-gradient text-xl font-bold -ml-2">
          Popular Cocktails
        </h2>
        <div className="w-max grid grid-cols-4 gap-x-32 gap-y-16">
          {popularCocktails?.map((cocktail) => (
            <div
              key={cocktail.idDrink}
              className="text-center space-y-2 golden-border"
            >
              <img
                src={cocktail.strDrinkThumb}
                alt={cocktail.strDrink}
                className="w-48 shadow-glass"
              />
              <p>{cocktail.strDrink}</p>
            </div>
          ))}
        </div>
        <Link to="/" className="block italic text-center">
          All Cocktails &gt;&gt;
        </Link>
      </div>

      {/* Quote */}
      <div className="flex flex-col justify-center items-center space-y-8 my-8">
        <hr className="w-60 golden-bar" />
        <q className="text-center font-bold italic gold-gradient tracking-wide">
          Every empty bottle is filled with a great story
        </q>
        <hr className="w-60 golden-bar" />
      </div>

      {/* Popular Ingredients */}
      <div className="py-16 w-max mx-auto space-y-8">
        <h2 className="gold-gradient text-xl font-bold -ml-2">
          Popular Ingredients
        </h2>
        <div className="w-max grid grid-cols-4 gap-x-32 gap-y-16">
          {popularIngredients?.map((ingredient) => (
            <div
              key={ingredient.idIngredient}
              className="text-center space-y-2"
            >
              <img
                src={getIngredientImageUrl(ingredient.strIngredient)}
                alt={ingredient.strIngredient}
                className="w-48"
              />
              <p>{ingredient.strIngredient}</p>
            </div>
          ))}
        </div>
        <Link to="/" className="block italic text-center">
          All Cocktails &gt;&gt;
        </Link>
      </div>
    </Layout>
  );
}
