<template>
  <div>
    <v-row class="pa-0">
      <!-- NOTE IF large 6 item md 9 -->
      <v-col
        cols="4"
        v-for="n in 6"
        :key="n"
        class="ma-0"
        :class="{'mt-12' : $vuetify.breakpoint.lgOnly, 'mt-10' : $vuetify.breakpoint.mdOnly }"
      >
        <v-hover v-slot:default="{ hover }">
          <v-card color="grey lighten-4" max-width="212" class="mx-auto mt-n2">
            <v-img
              :aspect-ratio="1/1"
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
                    <router-link :to="url">
                      <p>Potter And Fucking Wizard</p>
                    </router-link>

                    <p>
                      Penulis :
                      <router-link :to="url">J.K Dunkey</router-link>
                    </p>
                    <p>Status : Dropped</p>
                    <div class="d-flex flex-row justify-center">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <p class="mr-3">
                            <v-icon v-on="on" class="mr-1 white--text">star</v-icon>69
                          </p>
                        </template>
                        <span>Your Score</span>
                      </v-tooltip>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <p class="mr-2">
                            <v-icon v-on="on" class="mr-1 white--text">thumb_up</v-icon>
                          </p>
                        </template>
                        <span>You Recomended It</span>
                      </v-tooltip>
                      <v-tooltip bottom>
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
              </v-expand-transition>
            </v-img>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: "/"
    };
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
</style>