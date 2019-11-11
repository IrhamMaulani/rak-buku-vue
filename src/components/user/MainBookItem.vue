<template>
  <div>
    <v-row class="mt-12" v-for="n in 43" :key="n">
      <v-col cols="8" class="pa-0 mx-0">
        <p class="caption mx-4">Romance, Manga, Fucking Weaboo</p>
        <router-link :to="url">
          <h1 class="mx-4">Judul Buku</h1>
        </router-link>
        <p
          class=".body-2 mx-4 mt-4"
        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi tempore ...</p>
        <p class="mx-4 body-1">Pengarang : John K Lupin</p>
        <div class="d-flex mx-2">
          <p class="pa-2">Vol 1</p>
          <v-btn icon class="pa-2 ml-auto">
            <v-icon>bookmark_border</v-icon>
          </v-btn>
        </div>
      </v-col>
      <v-col cols="4" class="pa-0">
        <v-layout align-center justify-center>
          <v-img
            class="justify-center"
            :src="require('../../assets/cover-book.jpg')"
            lazy-src="https://picsum.photos/id/11/10/6"
            aspect-ratio="1"
            max-width="200"
            max-height="183"
          />
        </v-layout>
      </v-col>
    </v-row>
  </div>

  <!--  -->
</template>

<script>
export default {
  data() {
    return {
      url: ""
    };
  }
};
</script>

<style scoped>
.coba {
  background-color: antiquewhite;
}
.red {
  background-color: red;
}
a {
  text-decoration: none;
  color: black !important;
}
a:hover {
  text-decoration: underline;
}
</style>