<template>
  <img
    :src="isOverCard ? pokeballOpenImg : pokeballImg"
    alt=""
    class="cursor absolute w-8 duration-200 ease-out z-10 drop-shadow"
    :class="isOverCard && !isMobileDevice ? 'animate-bounce' : ''"
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
    isMobileDevice() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        )
      ) {
        return true;
      }
      return false;
    },
  },
  mounted() {
    // Picture that follows the cursor
    const cursor = document.querySelector(".cursor");

    if (!this.isMobileDevice) {
      // false for not mobile device
      document.addEventListener("mousemove", (e) => {
        cursor.setAttribute(
          "style",
          "top: " + (e.pageY + 12) + "px; left: " + (e.pageX + 12) + "px;",
        );
      });
    }
    cursor.classList.add("hidden");
  },
};
</script>

<style></style>
