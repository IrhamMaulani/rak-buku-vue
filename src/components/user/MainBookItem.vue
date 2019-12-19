<template>
  <div>
    <v-row class="mt-8" v-for="(book, index) in datas" :key="index">
      <v-col cols="8" class="pa-0 mx-0">
        <p class="caption mx-4">
          <router-link
            v-for="(tag, index) in book.tags"
            :key="index"
            :to="{ path: '/book', query: { tag: tag.name } }"
          >
            <span v-if="index != 0">{{ ", " }}</span>
            <span>{{ tag.name }}</span>
          </router-link>
        </p>
        <router-link :to="'/book/' + book.slug">
          <h1 class="mx-4">{{ book.title }}</h1>
        </router-link>
        <p class=".body-2 mx-4 mt-4">{{ book.description | snippet(50) }}</p>

        <p class="mx-4 body-1">
          Pengarang :
          <router-link
            v-for="(author, index) in book.authors"
            :key="index"
            :to="{ path: '/book', query: { author: author.name } }"
          >
            <span v-if="index != 0">{{ ", " }}</span>
            <span>{{ author.name }}</span>
          </router-link>
        </p>

        <div class="d-flex mx-2">
          <p class="pa-2">Vol : {{ book.volume }}</p>
          <div class="ml-auto" v-if="isLoggedIn">
            <span v-if="book.check_bookmarked !== null">
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
    <div v-if="!nextPageUrl" class="d-flex justify-center mt-12">
      <v-btn class="pa-8" @click="toTop" text large block :elevation="2">
        <p class="mt-n4">
          Sorry You Lurk Too Deep
          <br />Click To Top
        </p>
      </v-btn>
    </div>
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
      },
      page: 1,
      nextPageUrl: "",
      checked: true
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
          const updatedItem = this.datas.find(element => {
            return element.id === bookId;
          });
          updatedItem.check_bookmarked = {};

          updatedItem.check_bookmarked["status"] = "Wish List";
          this.bodySnackBar.message = "You Bookmarked It!";
          this.bodySnackBar.snackbar = true;
        })
        .catch(err => {
          this.bodySnackBar.message = "Failed";
          this.bodySnackBar.snackbar = true;
        });
    },
    getData() {
      this.$store.dispatch("setStatus", true);
      this.$http
        .get(
          `${this.$baseUrl}book?orderBy=created_at&order=desc&limit=10&page=${this.page}`
        )
        .then(result => {
          const datas = result.data.data;

          datas.forEach(element => {
            this.datas.push(element);
          });
          this.nextPageUrl = result.data.next_page_url;

          this.$store.dispatch("setStatus", false);
        })
        .catch(error => {
          alert(error);
        });
    },
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
          ) +
            window.innerHeight ===
          document.documentElement.offsetHeight;

        if (this.checked) {
          //stupid condition when stupid mounted keep persistent in another route
          if (bottomOfWindow) {
            if (this.nextPageUrl !== null) {
              this.page = this.page + 1;
              this.getData(this.page);
            }
          }
        }
      };
    },
    toTop() {
      window.scrollTo(0, 0);
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  mounted() {
    this.scroll();
  },
  destroyed() {
    //stupid variable when stupid mounted keep persistent in another route
    this.checked = false;
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
