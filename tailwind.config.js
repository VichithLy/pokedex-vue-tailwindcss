const types = require("./src/constants/pokemon_types.json");

module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        fire: types[0]["typeColor"],
        water: types[1]["typeColor"],
        grass: types[2]["typeColor"],
        electric: types[3]["typeColor"],
        psychic: types[4]["typeColor"],
        ice: types[5]["typeColor"],
        fighting: types[6]["typeColor"],
        flying: types[7]["typeColor"],
        poison: types[8]["typeColor"],
        ground: types[9]["typeColor"],
        rock: types[10]["typeColor"],
        bug: types[11]["typeColor"],
        dragon: types[12]["typeColor"],
        ghost: types[13]["typeColor"],
        dark: types[14]["typeColor"],
        steel: types[15]["typeColor"],
        fairy: types[16]["typeColor"],
        normal: types[17]["typeColor"],

        "pokemon-blue": {
          DEFAULT: "#3B4CCA",
          50: "#CCD0F1",
          100: "#BBC1ED",
          200: "#9BA4E4",
          300: "#7B87DB",
          400: "#5B69D3",
          500: "#3B4CCA",
          600: "#2C3AA1",
          700: "#202A75",
          800: "#141A49",
          900: "#080A1D",
        },

        "pokemon-red": {
          DEFAULT: "#FF0000",
          50: "#FFB8B8",
          100: "#FFA3A3",
          200: "#FF7A7A",
          300: "#FF5252",
          400: "#FF2929",
          500: "#FF0000",
          600: "#C70000",
          700: "#8F0000",
          800: "#570000",
          900: "#1F0000",
        },

        "pokemon-yellow": {
          DEFAULT: "#FFDE00",
          50: "#FFF6B8",
          100: "#FFF3A3",
          200: "#FFEE7A",
          300: "#FFE952",
          400: "#FFE329",
          500: "#FFDE00",
          600: "#C7AD00",
          700: "#8F7C00",
          800: "#574B00",
          900: "#1F1B00",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
