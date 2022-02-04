<template>
  <!-- Card -->
  <div class="rounded-2xl order-red-800 style_card">
    <div class="flex items-center flex-row justify-between" name="card_header">
      <div class="style_num flex justify-center items-center text-4xl pl-4">
        #{{ pokemonNum }}
      </div>
      <div
        class="shadow-2xl"
        style="
          width: 40px;
          height: 40px;
          border-radius: 20px;
          background: #5fbd58;
          margin-top: 10px;
          margin-right: 10px;
        "
      >
        <img
          class="style_type"
          :src="'https://images.gameinfo.io/pokemon-trimmed/60/p1.webp'"
          :alt="pokemonTypePict.alt"
          srcset=""
          style="margin: auto; margin-top: 8px"
        />
      </div>

      <!-- <div
        class="shadow-2xl"
        style="
          width: 40px;
          height: 40px;
          border-radius: 20px;
          background: #5fbd58;
        "
      >
        <img
          class="style_type"
          src="../assets/images/electric.png"
          alt="logo"
          srcset=""
          style="margin: auto; margin-top: 8px"
        />
      </div> -->
    </div>
    <div name="card_image">
      <img
        class="style_pokemon"
        :src="'https://images.gameinfo.io/pokemon-trimmed/60/p1.webp'"
        :alt="pokemonPict.alt"
        srcset=""
        style=""
      />
    </div>
    <div name="card_title">
      <div class="style_name">{{ pokemonName }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SimpleCard",
  props: {
    pokemonName: {
      type: String,
      required: true,
    },
    pokemonNum: {
      type: Number,
      required: true,
    },
    pokemonPict: {
      type: String,
      required: true,
    },
    pokemonTypePict: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Teko:wght@500&display=swap");
.style_card {
  height: 300px;
  width: 235px;
  background-color: orange;
}
.style_pokemon {
  margin-left: auto;
  margin-right: auto;
  height: 173px;
  width: 167px;
  margin-bottom: 10px;
}
.style_type {
  width: 24px;
  height: 24px;
}
.style_name {
  text-align: center;
  font-family: "Press Start 2P", cursive;
  font-size: 20px;
}
.style_num {
  /* margin-left: 1vw; */
  /* font-size: 36px; */
  font-family: "Teko", sans-serif;
}
</style>
