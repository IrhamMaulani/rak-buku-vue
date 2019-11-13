  <template>
  <v-container class="py-0">
    <v-row class="mb-3 pa-0" v-for="n in 10" :key="n">
      <v-col cols="12" class="pa-0 ma-0">
        <v-layout :justify-center="!$vuetify.breakpoint.smAndDown" class="pa-0 ma-0">
          <router-link :to="url">
            <p class="font-weight-bold pa-0 ma-0">Harry Potter Suck Fucking Dick So Much</p>
          </router-link>
        </v-layout>
      </v-col>

      <v-row class="pa-0 ma-0">
        <v-col cols="3">
          <p class="ma-0 pa-0 caption">
            <v-icon class="mr-1 mb-1">person</v-icon>
            <router-link :to="url">Jocoin</router-link>
          </p>
        </v-col>
        <v-col cols="6">
          <p class="ma-0 pa-0 caption">
            <v-icon class="mr-1 mb-1">menu_book</v-icon>
            <router-link :to="url">Lord Of The Ring Lmao</router-link>
          </p>
        </v-col>
        <v-col cols="3">
          <p class="ma-0 pa-0 caption">
            <v-icon class="mr-1 mb-1">emoji_emotions</v-icon>100
          </p>
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>


<script>
export default {
  data() {
    return {
      url: ""
    };
  }
};
</script>

<style scoped>
.red {
  background-color: red;
}
.blue {
  background-color: blue;
}
a {
  text-decoration: none;
  color: black !important;
}
a:hover {
  text-decoration: underline;
}
</style>