<template>
  <v-row>
    <v-overlay :value="overLay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-col cols="12" md="8" lg="8">
      <v-card>
        <v-card-title>Latest Update</v-card-title>
        <v-card-text class="text--primary mt-8">
          <main-item></main-item>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col md="4" lg="4" :class="{ 'px-0': !$vuetify.breakpoint.smAndDown }">
      <v-row>
        <v-col cols="12" class="py-0 mb-4">
          <v-card>
            <v-card-title class="pb-0">Popular Review</v-card-title>
            <v-card-text class="text--primary mt-8">
              <popular-review :datas="popularReview"></popular-review>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <div :class="{ sticky: !$vuetify.breakpoint.smAndDown }">
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
      popularBook: [],
      popularReview: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$store.dispatch("setStatus", true);
      this.$http
        .all([
          this.$http.get(
            `${this.$baseUrl}book?orderBy=score&order=desc&limit=10`
          ),
          this.$http.get(
            `${this.$baseUrl}review?orderBy=likes&order=desc&limit=10`
          )
        ])
        .then(
          this.$http.spread((popularBook, popularReview) => {
            this.popularBook = popularBook.data;
            this.popularReview = popularReview.data;
            this.$store.dispatch("setStatus", false);
          })
        )
        .catch(error => {
          this.openSnackbar(true, error);
        });
    }
  },
  computed: {
    overLay() {
      return this.$store.getters.status;
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
