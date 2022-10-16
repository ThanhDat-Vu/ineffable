import glassList from "../static/glassList";

const alcoholicMenu = [
  { label: "All", selected: true },
  { label: "Alcoholic", selected: false },
  { label: "Non alcoholic", selected: false },
  { label: "Optional alcohol", selected: false },
];

const glassMenu = [
  { label: "All", selected: true },
  ...glassList.map((glass) => ({ label: glass, selected: false })),
];

const cocktailFilter = [
  {
    label: "Alcoholic",
    menu: alcoholicMenu,
    styles: {
      fieldStyle:
        "lg:w-36 bg-transparent border-b border-gray-900 pb-1 text-right italic",
      menuStyle:
        "w-full bg-rich-black/40 backdrop-blur shadow-glass text-right z-10",
      optionStyle: "px-8 lg:px-2 py-2 hover:bg-white/10",
    },
    applyFilter: function (data, value) {
      return data.filter((i) => i.strAlcoholic == value);
    },
  },
  {
    label: "Glass",
    menu: glassMenu,
    styles: {
      fieldStyle:
        "lg:w-[13rem] bg-transparent border-b border-gray-900 pb-1 text-right italic",
      menuStyle:
        "w-full max-h-64 lg:max-h-96 overflow-y-scroll pr-0 bg-rich-black/40 backdrop-blur shadow-glass text-right z-10",
      optionStyle: "px-8 lg:px-1 py-2 hover:bg-white/10",
    },
    applyFilter: function (data, value) {
      return data.filter((i) => i.strGlass == value);
    },
  },
];

export default cocktailFilter;
