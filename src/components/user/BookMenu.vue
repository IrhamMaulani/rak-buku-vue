<template >
  <v-row class="mt-12">
    <v-overlay :value="overLay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-col cols="4" class="mt-6">
      <v-overflow-btn
        @change="order"
        target="#dropdown-example"
        v-model="orderById"
        :items="dropdown_sort"
        label="Sort By"
        item-value="id"
        item-text="id"
        class="combo"
      >
        <template slot="selection" slot-scope="data">
          <span class="ml-2">{{ data.item.title }}</span>
          <v-icon class="ml-1">{{ data.item.icon }}</v-icon>
        </template>
        <template slot="item" slot-scope="data">
          <span class="mr-1 cb-item">{{data.item.title}}</span>
          <v-icon class>{{data.item.icon}}</v-icon>
        </template>
      </v-overflow-btn>
    </v-col>
    <v-col cols="12" class>
      <v-card flat class="border" v-for="(book, index) in books.data" :key="book.id">
        <!-- <v-card-title class="border"></v-card-title> -->
        <!-- <v-card-text> -->
        <div class="d-flex justify-end mr-4">
          <p>{{index = index+1}}</p>
        </div>
        <v-row class="pa-0">
          <v-col cols="12" md="4" lg="4" class>
            <v-hover v-slot:default="{ hover }">
              <v-card color="grey lighten-4" class="mr-4">
                <div v-if="book.book_images_cover !== null">
                  <v-img
                    :src="book.book_images_cover.name"
                    lazy-src="https://picsum.photos/id/11/10/6"
                    min-height="570"
                    :aspect-ratio="16/9"
                  >
                    <v-expand-transition>
                      <div
                        v-if="hover"
                        class="d-flex transition-fast-in-fast-out blue-grey darken-2 v-card--reveal display-3 white--text"
                        style="height: 100%;"
                      >
                        <div
                          class="body-1 justify-center text-center mx-4"
                          :class="{'caption' : $vuetify.breakpoint.lgOnly, 'overline' : $vuetify.breakpoint.mdOnly,  }"
                        >{{book.description}}</div>
                      </div>
                    </v-expand-transition>
                  </v-img>
                </div>
                <div v-else>
                  <v-img
                    :src="require('../../assets/cover-book.jpg')"
                    lazy-src="https://picsum.photos/id/11/10/6"
                    min-height="570"
                    :aspect-ratio="16/9"
                  >
                    <v-expand-transition>
                      <div
                        v-if="hover"
                        class="d-flex transition-fast-in-fast-out blue-grey darken-2 v-card--reveal display-3 white--text"
                        style="height: 100%;"
                      >
                        <div
                          class="body-1 justify-center text-center mx-4"
                          :class="{'caption' : $vuetify.breakpoint.lgOnly, 'overline' : $vuetify.breakpoint.mdOnly,  }"
                        >{{book.description}}</div>
                      </div>
                    </v-expand-transition>
                  </v-img>
                </div>
              </v-card>
            </v-hover>
          </v-col>
          <v-col cols="12" md="8" lg="8" class="mt-12" style="position: relative; width:100%">
            <div class="d-flex flex-row headline mt-12">
              <p>Vol 1</p>
            </div>

            <p class="subtitle-1">
              <router-link v-for="(tag, index) in book.tags" :key="tag.id" :to="url">
                <span v-if="index != 0">{{', '}}</span>
                <span>{{tag.name}}</span>
              </router-link>
              <!-- <router-link :to="url">Manga</router-link>,
              <router-link :to="url">Fucking Weaboo</router-link>-->
            </p>

            <div class="mt-6">
              <p class="display-2 font-weight-bold">
                <router-link :to="url">{{book.title}}</router-link>
              </p>
            </div>

            <div class="d-flex align-content-start flex-wrap mt-12 mb-12 title font-weight-regular">
              <p class="mr-3">
                Pengarang :
                <router-link v-for="(author, index) in book.authors" :key="index" :to="url">
                  <span v-if="index != 0">{{', '}}</span>
                  <span>{{author.name}}</span>
                </router-link>
              </p>

              <p class="mr-3">
                Publisher :
                <router-link :to="url">{{book.publisher.name}}</router-link>
              </p>
              <p>
                <v-icon class="mr-2">print</v-icon>
                {{book.print_year}}
              </p>
            </div>
            <div
              class="d-flex flex-column title font-weight-regular mt-2"
              style="position: absolute; top:90%;"
            >
              <div class="d-flex fill-height mt-auto">
                <span class="mr-6">
                  <v-icon class="mr-2 mb-2">star</v-icon>
                  {{book.score}}
                </span>
                <span class="mr-6">
                  <v-icon class="mr-2 mb-1">favorite</v-icon>
                  {{book.favorites}}
                </span>
                <span v-if="book.check_bookmarked !== null">
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn icon v-on="on">
                        <v-icon>bookmark</v-icon>
                      </v-btn>
                    </template>
                    <span>Already Added To Your Wishlist!</span>
                  </v-tooltip>
                  <span v-if="book.check_bookmarked.is_owned === 1">Is Owned</span>
                </span>
                <span v-else>
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
        </v-row>
        <!-- </v-card-text> -->
      </v-card>
    </v-col>
    <snack-bar :body="bodySnackBar"></snack-bar>
  </v-row>
</template>

<script>
import SnackBar from "../../components/SnackBar";
export default {
  components: {
    SnackBar
  },
  data() {
    return {
      bodySnackBar: {
        timeout: 2000,
        message: "You Bookmarked It!",
        snackbar: false
      },
      dropdown_sort: [
        {
          params: "title_down",
          title: "Title",
          icon: "arrow_downward",
          id: 1
        },
        {
          params: "title_up",
          title: "Title",
          icon: "arrow_upward",
          id: 2
        },
        {
          params: "date_down",
          title: "Date",
          icon: "arrow_downward",
          id: 3
        },
        {
          params: "date_up",
          title: "Date",
          icon: "arrow_upward",
          id: 4
        },
        {
          params: "rating_down",
          title: "Scores",
          icon: "arrow_downward",
          id: 5
        },
        {
          params: "rating_up",
          title: "Scores",
          icon: "arrow_upward",
          id: 6
        }
      ],
      url: "/book/1",
      books: [],
      orderById: "",
      dataOrderBy: [
        {
          id: 1,
          orderBy: "title",
          order: "desc"
        },
        {
          id: 2,
          orderBy: "title",
          order: "asc"
        },
        {
          id: 3,
          orderBy: "created_at",
          order: "desc"
        },
        {
          id: 4,
          orderBy: "created_at",
          order: "asc"
        },
        {
          id: 5,
          orderBy: "score",
          order: "desc"
        },
        {
          id: 6,
          orderBy: "score",
          order: "asc"
        }
      ],
      overLay: true,
      search: this.$route.query.search
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData(
      orderBy = this.$route.query.orderBy || "created_at",
      order = this.$route.query.order || "desc",
      searchParams = 1
    ) {
      this.overLay = true;
      let search = "";

      if (this.search !== undefined) {
        search = this.search;
      }

      if (searchParams !== 1) {
        search = searchParams;
      }

      this.$http
        .get(
          `${this.$baseUrl}book?search=${search}&orderBy=${orderBy}&order=${order}&limit=5`
        )
        .then(result => {
          this.books = result.data;
          this.overLay = false;
        })
        .catch(error => {
          alert(error);
        });
    },
    order() {
      this.overLay = true;
      const orderBy = this.dataOrderBy.find(x => x.id === this.orderById);
      this.$router
        .replace({
          path: "book",
          query: { orderBy: orderBy.orderBy, order: orderBy.order }
        })
        .catch(err => {});

      this.getData(orderBy.orderBy, orderBy.order, " ");
    },
    bookMark(bookId) {
      if (window.$cookies.get("token") === null) {
        alert("You Must Login First");
        this.$router.push({ path: "/login" });
        return 0;
      }

      this.overLay = true;
      this.$http({
        url: `${process.env.VUE_APP_API}bookmark`,
        method: "POST",
        data: {
          status: "wish_list",
          is_owned: 0,
          book_id: bookId
        }
      })
        .then(resp => {
          const queryOrderBy = this.$route.query.orderBy || "created_at";
          const queryOrder = this.$route.query.order || "desc";
          const searchQuery = this.$route.query.search || "";

          this.getData(queryOrderBy, queryOrder, searchQuery);
          this.overLay = false;
          this.bodySnackBar.snackbar = true;
        })
        .catch(err => {
          console.log(err);
          alert("ERROR");
        });
    }
  },
  watch: {
    $route(to, from) {
      // console.log(to.query.search);
      this.getData("created_at", "desc", to.query.search);
    }
  }
};
</script>

<style scoped>
.border {
  border-bottom: 2px solid rgba(0, 0, 0, 0.363) !important;
  border-right: 2px solid rgba(0, 0, 0, 0.363) !important;
  border-radius: 0px !important;
}
.combo {
  cursor: pointer !important;
}
a {
  text-decoration: none;
  color: black !important;
}
a:hover {
  text-decoration: underline;
}
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 1;
  position: absolute;
  width: 100%;
}
</style>