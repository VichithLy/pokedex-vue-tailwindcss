/**
 * Scrolls to the element id in the DOM.
 * @param { String } id
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
 * This function have to be applied on the chain returned by the request to PokeAPI https://pokeapi.co/api/v2/evolution-chain/{id}/.
 * @param { Array || Object } data : the evolves_to Array
 * @param { Array } resultArray : the array of the evolutions chains (e.g. ["grass", "fire"])
 * @returns { Array } the result array
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
