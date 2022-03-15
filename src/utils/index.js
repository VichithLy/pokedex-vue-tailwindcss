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
