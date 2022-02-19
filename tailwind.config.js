const types = require("./src/constants/pokemon_types.json");

module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        fire: types[0]["typeColor"],
        "fire-dark": types[0]["bgColor"],
        water: types[1]["typeColor"],
        "water-dark": types[1]["bgColor"],
        grass: types[2]["typeColor"],
        "grass-dark": types[2]["bgColor"],
        electric: types[3]["typeColor"],
        "electric-dark": types[3]["bgColor"],
        psychic: types[4]["typeColor"],
        "psychic-dark": types[4]["bgColor"],
        ice: types[5]["typeColor"],
        "ice-dark": types[5]["bgColor"],
        fighting: types[6]["typeColor"],
        "fighting-dark": types[6]["bgColor"],
        flying: types[7]["typeColor"],
        "flying-dark": types[7]["bgColor"],
        poison: types[8]["typeColor"],
        "poison-dark": types[8]["bgColor"],
        ground: types[9]["typeColor"],
        "ground-dark": types[9]["bgColor"],
        rock: types[10]["typeColor"],
        "rock-dark": types[10]["bgColor"],
        bug: types[11]["typeColor"],
        "bug-dark": types[11]["bgColor"],
        dragon: types[12]["typeColor"],
        "dragon-dark": types[12]["bgColor"],
        ghost: types[13]["typeColor"],
        "ghost-dark": types[13]["bgColor"],
        dark: types[14]["typeColor"],
        "dark-dark": types[14]["bgColor"],
        steel: types[15]["typeColor"],
        "steel-dark": types[15]["bgColor"],
        fairy: types[16]["typeColor"],
        "fairy-dark": types[16]["bgColor"],
        normal: types[17]["typeColor"],
        "normal-dark": types[17]["bgColor"],

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

      maxHeight: {
        900: "900px",
        1000: "1000px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
