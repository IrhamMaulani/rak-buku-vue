  <template>
  <v-container class="py-0">
    <v-row class="mb-3 pa-0" v-for="review in datas.data" :key="review.id">
      <v-col cols="12" class="pa-0 ma-0">
        <v-layout :justify-center="!$vuetify.breakpoint.smAndDown" class="pa-0 ma-0">
          <router-link :to="'book/' + review.book.slug + '?slug=' + review.slug ">
            <p class="font-weight-bold pa-0 ma-0">{{review.title}}</p>
          </router-link>
        </v-layout>
      </v-col>

      <v-row class="pa-0 ma-0">
        <v-col cols="5">
          <p class="ma-0 pa-0 caption">
            <v-icon class="mr-1 mb-1">person</v-icon>
            {{review.user.name | snippet(15)}}
          </p>
        </v-col>
        <v-col cols="5">
          <p class="ma-0 pa-0 caption">
            <v-icon class="mr-1 mb-1">menu_book</v-icon>
            <router-link :to="'book/' + review.book.slug">{{review.book.title | snippet(18) }}</router-link>
          </p>
        </v-col>
        <v-col cols="2">
          <p class="ma-0 pa-0 caption">
            <v-icon class="mr-1 mb-1">emoji_emotions</v-icon>
            {{review.likes}}
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
  },
  props: {
    datas: {
      required: true
    }
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