<template>
  <img
    :src="isOverCard ? pokeballOpenImg : pokeballImg"
    alt=""
    class="cursor absolute w-8 duration-200 ease-out z-10 drop-shadow"
    :class="isOverCard ? 'animate-bounce' : ''"
  />
</template>

<script>
import pokeballImg from "../assets/images/cursor/pokeball.png";
import pokeballOpenImg from "../assets/images/cursor/pokeball_open.png";

export default {
  data() {
    return {
      pokeballImg,
      pokeballOpenImg,
      isOverCard: false,
    };
  },
  mounted() {
    // Image that follows the cursor
    const cursor = document.querySelector(".cursor");
    document.addEventListener("mousemove", (e) => {
      cursor.setAttribute(
        "style",
        "top: " + (e.pageY + 12) + "px; left: " + (e.pageX + 12) + "px;"
      );
    });

    // Click on card animation
    // document.addEventListener("mousedown", () => {
    //   if (this.isOverCard) {
    //     cursor.classList.add("animate-ping");
    //     cursor.classList.remove("animate-bounce");

    //     setTimeout(() => {
    //       cursor.classList.remove("animate-ping");
    //     }, 1000);
    //   }
    // });

    // Detect when cursor is on a card
    const simpleCards = document.querySelectorAll(".simple-card");
    simpleCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        this.isOverCard = true;
      });

      card.addEventListener("mouseleave", () => {
        this.isOverCard = false;
      });
    });
  },
};
</script>

<style></style>
