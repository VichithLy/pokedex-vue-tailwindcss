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
      resultArray.push(data[0].species.name);
      return getRecursiveEvolution(data[0].evolves_to, resultArray);
    }

    if (data instanceof Object) {
      resultArray.push(data.species.name);
      return getRecursiveEvolution(data.evolves_to, resultArray);
    }
  }
};

/**
 * Converts hg to kg
 * @param { number } weight
 * @returns hg weihgt in kg
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
 * @param {*} array
 * @param {*} type
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
 * @param {*} pokemon
 * @param {*} about
 * @param {*} evolution_chain
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
    picture: pokemon.sprites.other["official-artwork"].front_default,
    weight: pokemon.weight,
    height: pokemon.height,
    stats: pokemon.stats,
    abilities: pokemon.abilities,
    evolutions: evolution_chain,
  };
};

/**
 *
 * @param {*} pokemon
 * @returns
 */
export const createPokemonForSimpleCard = (pokemon) => {
  return {
    id: pokemon.data.id,
    name: pokemon.data.name,
    types: pokemon.data.types,
    picture: pokemon.data.sprites.other["official-artwork"].front_default,
  };
};

/**
 *
 * @param {*} name
 * @returns
 */
export const getPokemonByRegion = (name) => {
  return new Promise((resolve, reject) => {
    getRegionByName(name).then((response) => {
      const region = response.data;
      const region_url = region.main_generation.url;

      getDataFromUrl(region_url).then((response) => {
        const pokemons_species = response.data.pokemon_species;

        makeConcurrentRequests(
          pokemons_species.map((pokemon) => getDataFromUrl(pokemon.url)),
        )
          .then((response) => {
            const results = response.map((pokemon) => {
              return {
                name: pokemon.data.name,
                url: `https://pokeapi.co/api/v2/pokemon/${pokemon.data.id}/`,
              };
            });
            resolve(results);
          })
          .catch((error) => reject(error));
      });
    });
  });
};

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
