<template >
  <v-container class="py-0">
    <v-row class="mb-3 pa-0" v-for="n in 10" :key="n">
      <v-col cols="2" class="pa-0 ma-0">
        <v-img
          class="justify-center"
          :src="require('../../assets/cover-book.jpg')"
          lazy-src="https://picsum.photos/id/11/10/6"
          max-width="45"
          max-height="90"
        />
      </v-col>
      <v-col cols="10" class="pa-0 ma-0">
        <router-link :to="url">
          <p class="subtitle-2">Judul Buku</p>
        </router-link>
        <div class="d-flex ma-0 pa-0">
          <router-link :to="url">
            <p class="ma-0 pa-0">Vol 1</p>
          </router-link>
          <p class="ml-auto my-0 pa-0">
            <v-icon class="mr-2 mb-1">star</v-icon>6.9
          </p>
        </div>
      </v-col>
    </v-row>
  </v-container>
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
.red {
  background-color: red;
}
.blue {
  background-color: blue;
}
a {
  text-decoration: none;
  color: black !important;
}
a:hover {
  text-decoration: underline;
}
</style>