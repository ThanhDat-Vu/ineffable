import Layout from "../components/Layout";
import { BsArrowDown } from "react-icons/bs";
import Dropdown from "../components/Dropdown";
import { useState } from "react";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

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
              className="w-[32rem] p-3 bg-white/10 backdrop-blur focus:outline-0 focus:bg-white/20 shadow-glass"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            ></input>
            {/* Custom Select */}
            <Dropdown
              options={["Cocktail", "Ingredient"]}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
            <button className="px-6 py-3 bg-shiny-gold text-rich-black font-bold">
              Search
            </button>
          </form>
          {/* Random */}
          <p>Don’t tknow what to look for?</p>
          <button className="px-6 py-3 mt-2 bg-gray-400 text-rich-black font-bold">
            Give me anything
          </button>
          <BsArrowDown className="mt-32 text-xl animate-bounce" />
        </div>
      </div>
    </Layout>
  );
}
