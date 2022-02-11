/**
 * Scrolls to the element id in the DOM
 * @param { String } id
 */
export default function smoothScrollTo(id) {
  // time param needs to be greater than the css animation duration
  setTimeout(() => {
    document.getElementById(id).scrollIntoView({
      behavior: "smooth",
    });
  }, 200);
}
