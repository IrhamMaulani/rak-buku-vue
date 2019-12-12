<template >
  <v-container class="py-0">
    <v-row class="mb-3 pa-0" v-for="book in datas.data" :key="book.id">
      <v-col cols="2" class="pa-0 ma-0 mr-2">
        <div v-if="book.book_images_cover !== null">
          <v-img
            class="justify-center"
            :src="`${imageUrl}storage/${book.book_images_cover.name}`"
            lazy-src="require('../../assets/cover-book.jpg')"
            max-width="45"
            height="60"
          />
        </div>
        <div v-else>
          <v-img
            class="justify-center"
            :src="require('../../assets/cover-book.jpg')"
            lazy-src="require('../../assets/cover-book.jpg')"
            max-width="45"
            height="60"
          />
        </div>
      </v-col>
      <v-col cols="9" class="pa-0 ma-0">
        <router-link :to="'book/' + book.slug">
          <p class="subtitle-2">{{book.title}}</p>
        </router-link>
        <div class="d-flex ma-0 pa-0">
          <p class="ma-0 pa-0">Vol {{book.volume}}</p>

          <p class="ml-auto my-0 pa-0">
            <v-icon class="mr-2 mb-1">star</v-icon>
            {{book.score}}
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
      imageUrl: "http://localhost/rak-buku-web/public/"
    };
  },
  props: {
    datas: {
      required: true
    }
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