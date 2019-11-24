<template>
  <div>
    <v-row class="mt-8" v-for="data in datas" :key="id">
      <v-col cols="8" class="pa-0 mx-0">
        <span class="caption mx-4" v-for="tag in data.tags" :key="id">
          <router-link :to="url">{{tag.name}}</router-link>
        </span>
        <router-link :to="url">
          <h1 class="mx-4">{{data.title}}</h1>
        </router-link>
        <p class=".body-2 mx-4 mt-4">{{data.description}}</p>

        <p class="mx-4 body-1">
          Pengarang :
          <span v-for="author in data.authors">
            <router-link :to="url">{{author.name}}</router-link>
          </span>
        </p>

        <div class="d-flex mx-2">
          <p class="pa-2">{{data.volume}}</p>
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
        <v-layout align-center justify-center>
          <v-img
            class="justify-center"
            :src="data.book_images_covers"
            lazy-src="https://picsum.photos/id/11/10/6"
            aspect-ratio="1"
            max-width="200"
            max-height="183"
          />
        </v-layout>
      </v-col>
      {{data.book_images_covers}}
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
      url: "/"
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