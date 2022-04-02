import {
  getDataFromUrl,
  getRegionByName,
  getTypeByName,
  makeConcurrentRequests,
} from "../services/PokeAPI";

/**
 * Scrolls to the element id in the DOM.
 * @param { string } id
 */
export const smoothScrollTo = (id) => {
  // time param needs to be greater than the css animation duration
  setTimeout(() => {
    document.getElementById(id).scrollIntoView({
      behavior: "smooth",
    });
  }, 200);
};

/**
 * Hide scroll bar from the body element.
 * hide-overflow-y class is defined in src/App.vue
 * @param { Boolean } bool
 */
export const hideBodyOverflowY = (bool) => {
  if (bool) {
    document.body.classList.add("hide-overflow-y");
  }

  if (!bool) {
    document.body.classList.remove("hide-overflow-y");
  }
};

/**
 * Get recursively an array of a Pokemon's evolution chain.
 * This function has to be applied on the chain returned by the request to PokeAPI https://pokeapi.co/api/v2/evolution-chain/{id}/.
 * @param { object } data the evolves_to Array
 * @param { array } resultArray the array of the evolutions chains (e.g. ["grass", "fire"])
 * @returns { array } the result array
 */
export const getRecursiveEvolution = (data, resultArray) => {
  // Base case
  if (Array.isArray(data) && data.length == 0) {
    return resultArray;
  } else {
    // Recursive case
    if (Array.isArray(data)) {
      resultArray.push(data[0].species);
      return getRecursiveEvolution(data[0].evolves_to, resultArray);
    }

    if (data instanceof Object) {
      resultArray.push(data.species);

      return getRecursiveEvolution(data.evolves_to, resultArray);
    }
  }
};

/**
 * Converts hg to kg
 * @param { number } weight
 * @returns hg weight in kg
 */
export const hgToKg = (weight) => weight / 10;
/**
 * Converts hg to lbs
 * @param { number } weight
 * @returns hg weight in lbs
 */
export const hgToLbs = (weight) =>
  parseFloat(((weight / 10) * 2.205).toFixed(1));

/**
 * Converts dm to m
 * @param { number } height
 * @returns dm height in m
 */
export const dmToM = (height) => height / 10;

/**
 * Converts m to ft
 * @param { number } height
 * @returns m height in ft
 */
export const dmToFt = (height) =>
  parseFloat(((height / 10) * 3.281).toFixed(1));

/**
 * Returns the element height including margins
 * Credits : https://stackoverflow.com/a/54095466
 * @param element - element
 * @returns {number}
 */
export const outerHeight = (element) => {
  const height = element.offsetHeight,
    style = window.getComputedStyle(element);

  return ["top", "bottom"]
    .map((side) => parseInt(style[`margin-${side}`]))
    .reduce((total, side) => total + side, height);
};

export const arraysIntersectionOnPokemonName = (array1, array2) => {
  return array1.filter((a) => array2.some((b) => a.name === b.name));
};

/**
 *
 * @param { array } array
 * @returns array without duplicates objects based on name
 */
export const removeArrayDuplicatesByName = (array) => {
  // Credits: https://stackoverflow.com/a/36744732
  return array.filter(
    (value, index, self) =>
      index === self.findIndex((p) => p.name === value.name),
  );
};

/**
 * pokemons array must contains { name: string, type: string, slot: number } object
 * @param { array } pokemons
 * @param { string } type1
 * @param { string} type2
 * @returns array of Pokemons with type1 and type2 (order matters)
 */
export const getPokemonsWithExactlyTwoTypes = (pokemons, type1, type2) => {
  const pokemonsByTypeSlot1 = pokemons.filter(
    (p) => p.slot == 1 && p.type == type1,
  );

  const pokemonsByTypeSlot2 = pokemons.filter(
    (p) => p.slot == 2 && p.type == type2,
  );

  const results = pokemonsByTypeSlot1
    .map((p) => ({
      name: p.name,
      url: p.url,
    }))
    // Credits: https://stackoverflow.com/a/54763194
    .filter((a) => pokemonsByTypeSlot2.some((b) => a.name === b.name));

  return results;
};

/**
 *
 * @param { array } array
 * @returns
 */
export const pokemonsByNameAndUrl = (array) => {
  return array.map((object) => {
    let p = object.pokemon;
    return { name: p.name, url: p.url };
  });
};

/**
 *
 * @param {*} pokemon
 * @returns
 */
export const pokemonByIdAndNameAndPicture = (pokemon) => {
  return {
    id: pokemon.id,
    name: pokemon.name,
    picture: getExistingSprite(pokemon.sprites),
  };
};

/**
 *
 * @param { array } array
 * @param { string } type
 * @returns
 */
export const pokemonsByNameUrlTypeAndSlot = (array, type) => {
  return array.map((object) => {
    let p = object.pokemon;
    //* format the objects to be able to sort them
    return {
      name: p.name,
      url: p.url,
      type,
      slot: object.slot,
    };
  });
};

/**
 *
 * @param { object } pokemon
 * @param { string } about
 * @param { array } evolution_chain
 * @returns
 */
export const createPokemonForDetailedCard = (
  pokemon,
  about,
  evolution_chain,
) => {
  return {
    id: pokemon.id,
    name: pokemon.name,
    about: about,
    types: pokemon.types,
    picture: getExistingSprite(pokemon.sprites),
    weight: pokemon.weight,
    height: pokemon.height,
    stats: pokemon.stats,
    abilities: pokemon.abilities,
    evolutions: evolution_chain,
  };
};

/**
 *
 * @param { object } pokemon
 * @returns
 */
export const createPokemonForSimpleCard = (pokemon) => {
  return {
    id: pokemon.data.id,
    name: pokemon.data.name,
    types: pokemon.data.types,
    picture: getExistingSprite(pokemon.data.sprites),
  };
};

/**
 *
 * @param {*} sprites
 * @returns
 */
export const getExistingSprite = (sprites) => {
  return (
    sprites.other["official-artwork"].front_default ||
    sprites["back_default"] ||
    sprites["back_female"] ||
    sprites["back_shiny"] ||
    sprites["back_shiny_female"] ||
    sprites["front_default"] ||
    sprites["front_female"] ||
    sprites["front_shiny"] ||
    sprites.other["dream_world"].front_default ||
    sprites.other["dream_world"].front_female ||
    sprites.other["home"].front_default ||
    sprites.other["home"].front_female ||
    sprites.other["home"].front_shiny ||
    sprites.other["home"].front_shiny_female
  );
};

/**
 *
 * @param { string } url
 * @returns
 */
export const getIdFromUrl = (url) => {
  const splitUrl = url.split("/");
  const id = splitUrl[splitUrl.length - 2];

  return id;
};

/**
 *
 * @param { object } specie
 */
export const formatPokemonSpecie = (specie) => {
  const id = getIdFromUrl(specie.url);

  return {
    name: specie.name,
    url: `https://pokeapi.co/api/v2/pokemon/${id}/`,
  };
};

//! ==================================
//! ======== Sorting section =========
//! ==================================

/**
 *
 * @param { string } region
 * @returns
 */
export const getPokemonByRegion = (region) => {
  return new Promise((resolve, reject) => {
    getRegionByName(region).then((response) => {
      const region = response.data;
      const region_url = region.main_generation.url;

      /**
       * ! We use getDataFromUrl() instead of getPokemonByName()
       * ! because some Pokemons need to be searched by their id
       * ! e.g.: deoxys
       */
      getDataFromUrl(region_url)
        .then((response) => {
          const pokemons_species = response.data.pokemon_species;

          const results = pokemons_species.map((specie) =>
            formatPokemonSpecie(specie),
          );

          resolve(results);
        })
        .catch((error) => reject(error));
    });
  });
};

/**
 *
 * @param { array } types
 * @returns
 */
export const getPokemonsByTypes = (types) => {
  //! If only one type
  if (types.length == 1) {
    return new Promise((resolve, reject) => {
      getTypeByName(types[0])
        .then((response) => {
          //* Get pokemon array from each response
          const results = pokemonsByNameAndUrl(response.data.pokemon);

          resolve(results);
        })
        .catch((error) => reject(error));
    });
  }

  //! If 2 types selected
  if (types.length == 2) {
    return new Promise((resolve, reject) => {
      makeConcurrentRequests(types.map((type) => getTypeByName(type)))
        .then((responses) => {
          /**
           * We have 2 possibilities :
           * - Get Pokemons with types including type1 AND type2 (vice versa)
           * - Get Pokemons with types including type1 OR (inclusive) type2
           */
          let pokemons = [];

          //* Concat the arrays
          responses.forEach((response) => {
            const type = response.data.name;

            pokemons = pokemons.concat(
              //* format the objects to be able to sort them
              pokemonsByNameUrlTypeAndSlot(response.data.pokemon, type),
            );
          });

          //* (slot_1: first_type; slot_2: second_type)
          const combination1 = getPokemonsWithExactlyTwoTypes(
            pokemons,
            types[0],
            types[1],
          );

          //* (slot_1: second_type; slot_2: first_type)
          const combination2 = getPokemonsWithExactlyTwoTypes(
            pokemons,
            types[1],
            types[0],
          );

          //* Concat these 2 arrays
          const results = combination1.concat(combination2);

          resolve(results);
        })
        .catch((error) => reject(error));
    });
  }
};

/**
 *
 * @param { string } region
 * @param { array } types
 * @returns
 */
export const getPokemonsByRegionAndTypes = (region, types) => {
  return new Promise((resolve, reject) => {
    getPokemonByRegion(region).then((pokemons_by_region) => {
      getPokemonsByTypes(types)
        .then((pokemons_by_types) => {
          const results = arraysIntersectionOnPokemonName(
            pokemons_by_region,
            pokemons_by_types,
          );
          resolve(results);
        })
        .catch((error) => reject(error));
    });
  });
};

export const getPokemonsByRegionAndNameOrId = (region, nameOrId) => {
  return new Promise((resolve, reject) => {
    getPokemonByRegion(region)
      .then((pokemons_by_region) => {
        resolve(filterPokemonsByNameOrId(pokemons_by_region, nameOrId));
      })
      .catch((error) => reject(error));
  });
};

export const getPokemonsByTypesAndNameOrId = (types, nameOrId) => {
  return new Promise((resolve, reject) => {
    getPokemonsByTypes(types)
      .then((pokemons_by_types) => {
        resolve(filterPokemonsByNameOrId(pokemons_by_types, nameOrId));
      })
      .catch((error) => reject(error));
  });
};

export const getPokemonsByRegionAndTypesAndNameOrId = (
  region,
  types,
  nameOrId,
) => {
  return new Promise((resolve, reject) => {
    getPokemonsByRegionAndTypes(region, types)
      .then((pokemons_by_region_and_types) => {
        resolve(
          filterPokemonsByNameOrId(pokemons_by_region_and_types, nameOrId),
        );
      })
      .catch((error) => reject(error));
  });
};

/**
 *
 * @param { array } pokemons
 * @param { string } value
 * @returns
 */
export const filterPokemonsByNameOrId = (pokemons, value) => {
  return pokemons.filter((pokemon) => {
    // We have to verify the user input before returning
    // Input needs to be in lower case & trimmed

    const id = getIdFromUrl(pokemon.url).split(pokemon.url.length - 1);

    return (
      pokemon.name.toLowerCase().includes(value.toLowerCase()) ||
      containsNumber(id, value)
    );
  });
};

export const sortPokemonsByNameAsc = (pokemons) => {
  return pokemons.sort((a, b) => (a.name > b.name ? 1 : -1));
};

export const sortPokemonsByNameDesc = (pokemons) => {
  return pokemons.sort((a, b) => (a.name < b.name ? 1 : -1));
};

export const sortPokemonsByIdAsc = (pokemons) => {
  return pokemons.sort((a, b) => a.id - b.id);
};

export const sortPokemonsByIdAscUsingUrl = (pokemons) => {
  return pokemons.sort((a, b) => getIdFromUrl(a.url) - getIdFromUrl(b.url));
};

export const sortPokemonsByIdDesc = (pokemons) => {
  return pokemons.sort((a, b) => b.id - a.id);
};

export const sortPokemonsByIdDescUsingUrl = (pokemons) => {
  return pokemons.sort((a, b) => getIdFromUrl(b.url) - getIdFromUrl(a.url));
};

/**
 *
 * @param { array } array
 * @returns
 */
export const findEnglishFlavorText = (array) => {
  return array.find((object) => object.language.name == "en").flavor_text;
};

/**
 *
 * @param { string } str
 * @returns
 */
export const escapeSpecialChars = (str) => {
  return str.replace(/\f/, " ").replace("POKéMON", "Pokémon");
};

/**
 *
 * @param {*} str
 * @param {*} number
 * @returns
 */
export const containsNumber = (str, number) => {
  const regex = new RegExp(`${number}`);
  return regex.test(str);
};
