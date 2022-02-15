<template>
  <img
    :src="isOverCard ? pokeballOpenImg : pokeballImg"
    alt=""
    class="cursor absolute w-8 duration-200 ease-out z-10 drop-shadow"
    :class="isOverCard ? 'animate-bounce' : ''"
  />
</template>

<script>
import { mapState } from "vuex";
import pokeballImg from "../assets/images/cursor/pokeball.png";
import pokeballOpenImg from "../assets/images/cursor/pokeball_open.png";

export default {
  data() {
    return {
      pokeballImg,
      pokeballOpenImg,
    };
  },
  computed: {
    ...mapState("cursor", ["isOverCard"]),
  },
  mounted() {
    // Picture that follows the cursor
    const cursor = document.querySelector(".cursor");
    document.addEventListener("mousemove", (e) => {
      cursor.setAttribute(
        "style",
        "top: " + (e.pageY + 12) + "px; left: " + (e.pageX + 12) + "px;"
      );
    });
  },
};
</script>

<style></style>
