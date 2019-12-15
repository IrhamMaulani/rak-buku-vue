<template>
  <div class="relative">
    <v-row class="pa-0">
      <!-- NOTE IF large 6 item md 9 -->

      <v-col
        cols="4"
        v-for="(data, index) in datas.data"
        :key="index"
        class="ma-0"
      >
        <v-hover v-slot:default="{ hover }">
          <v-card color="grey lighten-4" max-width="212" class="mx-auto mt-n2">
            <div v-if="data.book_images_cover !== null">
              <v-img
                :aspect-ratio="1 / 1"
                height="190"
                :src="`${imageUrl}storage/${data.book_images_cover.name}`"
              >
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex justify-center transition-fast-in-fast-out blue-grey darken-4 v-card--reveal white--text"
                    style="height: 100%;"
                  >
                    <div class="overline justify-center text-center mt-2">
                      <!-- <v-icon dark class="text-center">star_border</v-icon>6.9 -->
                      <p class="text-center" v-if="check_bookmarked != null">
                        <span v-if="check_bookmarked.is_owned == 1">Owned</span>
                      </p>
                      <router-link :to="'/book/' + data.slug">
                        <p>{{ data.title }}</p>
                      </router-link>

                      <p>
                        Penulis :
                        <router-link :to="url">{{
                          data.authors[0].name
                        }}</router-link>
                      </p>
                      <p>Status : {{ data.check_bookmarked.status }}</p>
                      <div class="d-flex flex-row justify-center">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <p class="mr-3">
                              <v-icon v-on="on" class="mr-1 white--text"
                                >star</v-icon
                              >
                              {{ data.user_score.score }}
                            </p>
                          </template>
                          <span>Your Score</span>
                        </v-tooltip>

                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <p>
                              <v-icon v-on="on" class="mr-1 white--text"
                                >favorite_border</v-icon
                              >
                            </p>
                          </template>
                          <span>Your Favorite</span>
                        </v-tooltip>
                      </div>
                    </div>
                  </div>
                </v-expand-transition>
              </v-img>
            </div>
            <div v-else>
              <v-img
                :aspect-ratio="1 / 1"
                height="190"
                src="https://cdn.vuetifyjs.com/images/cards/kitchen.png"
              >
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex justify-center transition-fast-in-fast-out blue-grey darken-4 v-card--reveal white--text"
                    style="height: 100%;"
                  >
                    <div class="overline justify-center text-center mt-2">
                      <!-- <v-icon dark class="text-center">star_border</v-icon>6.9 -->
                      <p class="text-center">Owned</p>
                      <router-link :to="'/book/' + data.slug">
                        <p>{{ data.title }}</p>
                      </router-link>

                      <p>
                        Penulis :
                        <router-link :to="url">{{
                          data.authors[0].name
                        }}</router-link>
                      </p>
                      <p>Status : {{ data.check_bookmarked.status }}</p>
                      <div class="d-flex flex-row justify-center">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <p class="mr-3">
                              <v-icon v-on="on" class="mr-1 white--text"
                                >star</v-icon
                              >
                              {{ data.user_score.score }}
                            </p>
                          </template>
                          <span>Your Score</span>
                        </v-tooltip>

                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <p>
                              <v-icon v-on="on" class="mr-1 white--text"
                                >favorite_border</v-icon
                              >
                            </p>
                          </template>
                          <span>Your Favorite</span>
                        </v-tooltip>
                      </div>
                    </div>
                  </div>
                </v-expand-transition>
              </v-img>
            </div>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>

    <!-- <div class="coba-lagi"> -->
    <v-pagination
      class="center-pagination"
      v-model="datas.current_page"
      :total-visible="4"
      :length="datas.last_page"
      circle
      @input="pagination"
    ></v-pagination>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: "/",
      imageUrl: "http://localhost/rak-buku-web/public/",
      datas: []
    };
  },
  props: {
    status: {
      required: true
    }
  },
  methods: {
    getData() {
      let url = this.status;

      this.$store.dispatch("setStatus", true);
      this.$http
        .get(`${this.$baseUrl}bookmark?${url}`)
        .then(result => {
          this.datas = result.data;
          this.$store.dispatch("setStatus", false);
        })
        .catch(error => {
          alert(error);
          this.$store.dispatch("setStatus", false);
        });
    },
    pagination() {
      let url = this.status;

      this.$http
        .get(`${this.$baseUrl}bookmark?${url}&page=${this.datas.current_page}`)
        .then(result => {
          this.datas = result.data;
          this.$store.dispatch("setStatus", false);
        })
        .catch(error => {
          alert(error);
          this.$store.dispatch("setStatus", false);
        });
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 1;
  position: absolute;
  width: 100%;
}
a {
  text-decoration: none;
  color: white !important;
}
a:hover {
  text-decoration: underline;
}
.relative {
  height: 490px !important;
  position: relative;
  padding-bottom: 50px;
}

.center-pagination {
  position: absolute;
  bottom: 0;
  right: 3%;
  /* left: 20%; */
}
</style>
