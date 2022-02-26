/**
 * Scrolls to the element id in the DOM
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
