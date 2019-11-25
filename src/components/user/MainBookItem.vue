<template>
  <div>
    <v-row class="mt-8" v-for="book in datas.data" :key="book.id">
      <v-col cols="8" class="pa-0 mx-0">
        <p class="caption mx-4">
          <router-link v-for="(tag, index) in book.tags" :key="index" :to="url">
            <span v-if="index != 0">{{', '}}</span>
            <span>{{ tag.name }}</span>
          </router-link>
        </p>
        <router-link :to="'/book/' + book.slug">
          <h1 class="mx-4">{{book.title}}</h1>
        </router-link>
        <p class=".body-2 mx-4 mt-4">{{book.description}}</p>

        <p class="mx-4 body-1">
          Pengarang :
          <router-link v-for="(author, index) in book.authors" :key="index" :to="url">
            <span v-if="index != 0">{{', '}}</span>
            <span>{{author.name}}</span>
          </router-link>
        </p>

        <div class="d-flex mx-2">
          <p class="pa-2">Vol : {{book.volume}}</p>
          <v-tooltip left>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on" class="pa-2 ml-auto">
                <v-icon>bookmark_border</v-icon>
              </v-btn>
            </template>
            <span>Add To Your Wish List</span>
          </v-tooltip>
        </div>
      </v-col>
      <v-col cols="4" class="pa-0">
        <v-layout align-center justify-center v-if="book.book_images_cover !== null">
          <v-img
            class="justify-center"
            :src="book.book_images_cover.name"
            :lazy-src="require('../../assets/cover-book.jpg')"
            aspect-ratio="1"
            max-width="200"
            max-height="183"
          />
        </v-layout>
        <v-layout align-center justify-center v-else>
          <v-img
            class="justify-center"
            :src="require('../../assets/cover-book.jpg')"
            :lazy-src="require('../../assets/cover-book.jpg')"
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
  props: {
    datas: {
      required: true
    }
  },
  data() {
    return {
      url: this.$baseUrl,
      defaultImg: "require('../../assets/cover-book.jpg')"
    };
  },
  computed: {
    imageDefault() {
      return this.defaultImg;
    }
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