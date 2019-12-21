<template>
  <div class="relative">
    <v-row v-if="datas.length <= 0">
      <v-container class="fill-height d-flex justify-center" fluid>
        <v-img :src="require('../../assets/nothing.svg')" max-height="425" contain />
        <p class="title mt-2">Nothing Here. You Need To Start Book Mark Book</p>
      </v-container>
    </v-row>
    <v-row v-else class="pa-0">
      <v-col cols="4" v-for="(data, index) in dataPagin" :key="index" class="ma-0">
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
                        <router-link
                          v-if="data.authors > 0"
                          :to="{ path: '/book', query: { author: data.authors[0].name } }"
                        >
                          {{
                          data.authors[0].name
                          }}
                        </router-link>
                      </p>
                      <p>Status : {{ data.check_bookmarked.status }}</p>
                      <div class="d-flex flex-row justify-center">
                        <span v-if=" data.user_score !== null">
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <p class="mr-3">
                                <v-icon v-on="on" class="mr-1 white--text">star</v-icon>
                                {{ data.user_score.score }}
                              </p>
                            </template>
                            <span>Your Score</span>
                          </v-tooltip>
                        </span>

                        <div v-if="data.check_bookmarked !== null">
                          <v-tooltip v-if="data.check_bookmarked.is_favorite !== 0" bottom>
                            <template v-slot:activator="{ on }">
                              <p>
                                <v-icon v-on="on" class="mr-1 white--text">favorite_border</v-icon>
                              </p>
                            </template>
                            <span>Your Favorite</span>
                          </v-tooltip>
                        </div>
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

                      <p v-if="data.authors.length > 0">
                        Penulis :
                        <router-link
                          :to="{ path: '/book', query: { author: data.authors[0].name } }"
                        >
                          {{
                          data.authors[0].name
                          }}
                        </router-link>
                      </p>
                      <p>Status : {{ data.check_bookmarked.status }}</p>
                      <div class="d-flex flex-row justify-center">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <p class="mr-3">
                              <v-icon v-on="on" class="mr-1 white--text">star</v-icon>
                              {{ data.user_score.score }}
                            </p>
                          </template>
                          <span>Your Score</span>
                        </v-tooltip>

                        <div v-if="data.check_bookmarked !== null">
                          <v-tooltip v-if="data.check_bookmarked.is_favorite !== 0" bottom>
                            <template v-slot:activator="{ on }">
                              <p>
                                <v-icon v-on="on" class="mr-1 white--text">favorite_border</v-icon>
                              </p>
                            </template>
                            <span>Your Favorite</span>
                          </v-tooltip>
                        </div>
                      </div>
                    </div>
                  </div>
                </v-expand-transition>
              </v-img>
            </div>
          </v-card>
        </v-hover>
      </v-col>
      <v-pagination
        class="center-pagination"
        v-model="currentPage"
        :length="dataLength"
        circle
        :total-visible="6"
        @input="pagination"
      ></v-pagination>
    </v-row>

    <!-- <div class="coba-lagi"> -->

    <!-- </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: "/",
      imageUrl: "http://localhost/rak-buku-web/public/",
      datas: [],
      dataPagin: [],
      dataLength: null,
      currentPage: null
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
          // this.datas = result.data;
          this.$store.dispatch("setStatus", false);
          this.dataLength = result.data.last_page;
          this.currentPage = result.data.currentPage;

          const datas = result.data.data;
          datas.forEach(element => {
            element["pagin"] = 1;
            this.dataPagin.push(element);
            this.datas.push(element);
          });
        })
        .catch(error => {
          alert(error);
          this.$store.dispatch("setStatus", false);
        });
    },
    pagination() {
      let url = this.status;

      const filteredData = this.datas.filter(element => {
        return element.pagin === this.currentPage;
      });

      this.dataPagin = filteredData;

      if (this.dataPagin.length < 1) {
        this.$http
          .get(`${this.$baseUrl}bookmark?${url}&page=${this.currentPage}`)
          .then(result => {
            const datas = result.data.data;
            datas.forEach(element => {
              element["pagin"] = this.currentPage;
              this.datas.push(element);
              this.dataPagin.push(element);
            });

            this.$store.dispatch("setStatus", false);
          })
          .catch(error => {
            alert(error);
            this.$store.dispatch("setStatus", false);
          });
      }
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
.img-not-found {
  position: absolute;
  /* width: 100%; */
  height: 100%;
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
