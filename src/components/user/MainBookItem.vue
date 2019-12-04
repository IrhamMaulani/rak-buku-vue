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
          <span class="ml-auto" v-if="book.check_bookmarked !== null">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon>bookmark</v-icon>
                </v-btn>
              </template>
              <span>Already Added To Your Wishlist!</span>
            </v-tooltip>
          </span>
          <span class="ml-auto" v-else>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" @click="bookMark(book.id)">
                  <v-icon>bookmark_border</v-icon>
                </v-btn>
              </template>
              <span>Add To Your Wish List</span>
            </v-tooltip>
          </span>
        </div>
      </v-col>
      <v-col cols="4" class="pa-0">
        <v-layout align-center justify-center v-if="book.book_images_cover !== null">
          <v-img
            class="justify-center"
            :src="`${url}storage/${book.book_images_cover.name}`"
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
    <snack-bar :body="bodySnackBar"></snack-bar>
  </div>

  <!--  -->
</template>

<script>
import SnackBar from "../../components/SnackBar";
export default {
  components: {
    SnackBar
  },
  data() {
    return {
      url: "http://localhost/rak-buku-web/public/",
      defaultImg: "require('../../assets/cover-book.jpg')",
      datas: [],
      bodySnackBar: {
        timeout: 2000,
        message: "",
        snackbar: false
      }
    };
  },
  created() {
    this.getData();
  },
  computed: {
    imageDefault() {
      return this.defaultImg;
    }
  },
  methods: {
    bookMark(bookId) {
      if (window.$cookies.get("token") === null) {
        alert("You Must Login First");
        this.$router.push({ path: "/login" });
        return 0;
      }

      this.$store.dispatch("setStatus", true);
      this.$http({
        url: `${process.env.VUE_APP_API}bookmark`,
        method: "POST",
        data: {
          status: "Wish List",
          is_owned: 0,
          book_id: bookId
        }
      })
        .then(resp => {
          this.$store.dispatch("setStatus", false);
          this.getData();
          this.bodySnackBar.message = "You Bookmarked It!";
          this.bodySnackBar.snackbar = true;
        })
        .catch(err => {
          this.$store.dispatch("setStatus", false);
          this.bodySnackBar.message = "Failed";
          this.bodySnackBar.snackbar = true;
        });
    },
    getData() {
      this.$store.dispatch("setStatus", true);
      this.$http
        .get(`${this.$baseUrl}book?orderBy=created_at&order=desc&limit=10`)
        .then(result => {
          this.datas = result.data;
          this.$store.dispatch("setStatus", false);
        })
        .catch(error => {
          alert(error);
        });
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