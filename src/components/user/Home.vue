<template>
  <v-row>
    <v-col cols="12" md="8" lg="8">
      <v-card>
        <v-card-title>Latest Update</v-card-title>
        <v-card-text class="text--primary mt-8">
          <main-item :datas="mainBook"></main-item>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col md="4" lg="4" :class="{'px-0' : !$vuetify.breakpoint.smAndDown }">
      <v-row>
        <v-col cols="12" class="py-0 mb-4">
          <v-card>
            <v-card-title class="pb-0">Popular Review</v-card-title>
            <v-card-text class="text--primary mt-8">
              <popular-review></popular-review>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <div :class="{'sticky' : !$vuetify.breakpoint.smAndDown }">
        <v-row>
          <v-col cols="12" class="py-0 mb-1">
            <v-card>
              <v-card-title class="pb-0">Popular Books</v-card-title>
              <v-card-text class="text--primary mt-8">
                <popular-book-item :datas="popularBook"></popular-book-item>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="py-0">
            <v-card>
              <user-footer></user-footer>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import Footer from "../user/Footer.vue";
import MainBookItem from "../user/MainBookItem";
import PopularBookItem from "../user/PopularBookItem";
import PopularReview from "../user/PopularReview";

export default {
  components: {
    "user-footer": Footer,
    "main-item": MainBookItem,
    "popular-book-item": PopularBookItem,
    "popular-review": PopularReview
  },
  data() {
    return {
      mainBook: [],
      popularBook: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$http
        .all([
          this.$http.get(
            `${this.$baseUrl}book?orderBy=created_at&order=desc&limit=10`
          ),
          this.$http.get(
            `${this.$baseUrl}book?orderBy=score&order=desc&limit=10`
          )
        ])
        .then(
          this.$http.spread((mainBook, popularBook) => {
            this.mainBook = mainBook.data;
            this.popularBook = popularBook.data;
          })
        )
        .catch(error => {
          this.openSnackbar(true, error);
        });
    }
  }
};
</script>

<style scoped>
.sticky {
  position: sticky;
  top: 0;
}
</style>