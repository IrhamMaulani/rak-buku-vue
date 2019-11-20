<template >
  <v-row class="mt-12">
    <v-col cols="4" class="mt-6">
      <v-overflow-btn
        v-model="select"
        target="#dropdown-example"
        :items="dropdown_sort"
        label="Sort By"
        item-value="params"
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
      <v-card flat class="border" v-for="n in 6" :key="n">
        <!-- <v-card-title class="border"></v-card-title> -->
        <!-- <v-card-text> -->
        <div class="d-flex justify-end mr-4">
          <p>{{n}}</p>
        </div>
        <v-row class="pa-0">
          <v-col cols="12" md="4" lg="4" class>
            <v-hover v-slot:default="{ hover }">
              <v-card color="grey lighten-4" class="mr-4">
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
                      >
                        Eighth story arc of JoJo no Kimyou na Bouken series.
                        Following the Great East Japan earthquake,
                        Morioh has been stricken by vast earthen protrusions known by the locals as Wall Eyes.
                        Despite investigation, professional estimations are left empty. Meanwhile, the young girl
                        Yasuho Hirose discovers a man buried within the ground, he possesses a distinctive star-shaped birthmark
                        together with deeply penetrating bite marks. The man, who has contracted a staple case of amnesia is taken in by a local
                        family and given the name Jousuke Higashikata, however mysterious events cannot stop from piling one upon the other
                        and soon that enigma known as stand emerges to
                      </div>
                    </div>
                  </v-expand-transition>
                </v-img>
              </v-card>
            </v-hover>
          </v-col>
          <v-col cols="12" md="8" lg="8" class="mt-12" style="position: relative; width:100%">
            <div class="d-flex flex-row headline mt-12">
              <p>Vol 1</p>
            </div>

            <p class="subtitle-1">
              <router-link :to="url">Romance</router-link>,
              <router-link :to="url">Manga</router-link>,
              <router-link :to="url">Fucking Weaboo</router-link>
            </p>

            <div class="mt-6">
              <p class="display-2 font-weight-bold">
                <router-link :to="url">The Lord Of The Rings The Return Of The King</router-link>
              </p>
            </div>

            <div class="d-flex align-content-start flex-wrap mt-12 mb-12 title font-weight-regular">
              <p class="mr-3">
                Pengarang :
                <router-link :to="url">J.K Dunkey Lmao</router-link>
              </p>
              <p class="mr-3">
                Publisher :
                <router-link :to="url">Hogwart Lmao</router-link>
              </p>
              <p>
                <v-icon class="mr-2">print</v-icon>2019
              </p>
            </div>
            <div
              class="d-flex flex-column title font-weight-regular mt-2"
              style="position: absolute; top:90%;"
            >
              <div class="d-flex fill-height mt-auto">
                <span class="mr-6 mb-n1">
                  <p>Is Owned</p>
                </span>
                <span class="mr-6">
                  <v-icon class="mr-2 mb-2">star</v-icon>6.9
                </span>
                <span class="mr-6">
                  <v-icon class="mr-2 mb-1">favorite</v-icon>100
                </span>
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                      <v-icon>bookmark_border</v-icon>
                    </v-btn>
                  </template>
                  <span>Add To Your Wish List</span>
                </v-tooltip>
              </div>
            </div>
          </v-col>
        </v-row>
        <!-- </v-card-text> -->
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      dropdown_sort: [
        { params: "title_down", title: "Title", icon: "arrow_downward" },
        { params: "title_up", title: "Title", icon: "arrow_upward" },
        { params: "date_down", title: "Date", icon: "arrow_downward" },
        { params: "date_up", title: "Date", icon: "arrow_upward" },
        { params: "rating_down", title: "Rating", icon: "arrow_downward" },
        { params: "rating_up", title: "Rating", icon: "arrow_upward" }
      ],
      url: "/book/1"
    };
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