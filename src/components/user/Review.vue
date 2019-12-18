<template>
  <div>
    <v-card class="mb-4" v-for="(data,index) in datas.data" :key="index">
      <v-row>
        <v-col
          cols="1"
          class="ml-12 mt-4 text-center pr-0"
          :class="{'mr-8' : $vuetify.breakpoint.smAndDown }"
        >
          <v-avatar size="40" class="ma-0">
            <v-img
              :src="require('../../assets/profile.png')"
              lazy-src="https://picsum.photos/id/11/10/6"
              class="ma-0"
            />
          </v-avatar>
        </v-col>
        <v-col cols="8" class="mt-4 pl-0">
          <router-link :to="url">
            <p class="title ma-0">{{data.title}}</p>
          </router-link>
        </v-col>
      </v-row>
      <v-row justify="center" class="mt-n6">
        <v-col cols="1" :class="{'mr-12' : $vuetify.breakpoint.smAndDown }"></v-col>
        <v-col cols="10" class="ml-n8">
          <span class="mr-6">
            <router-link :to="url">{{data.created_at}}</router-link>
          </span>
          <span class="underline">
            <router-link :to="url">{{data.user.name}}</router-link>
          </span>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" class="px-10 text-left">
          <p class="mx-12">{{data.content}}</p>
        </v-col>

        <p class="ml-auto mr-12">
          <router-link :to="url">Read More</router-link>
        </p>
      </v-row>
      <v-row justify="center" class="mt-n8">
        <v-col cols="1"></v-col>
        <v-col cols="11" class="mb-4 ml-12 d-flex flex-row justify-start">
          <span v-if="data.self_response !== null" class="mr-12">
            <v-btn
              v-if="data.self_response.is_like === 1"
              text
              icon
              class="mr-4"
              color="blue"
              @click="addLike(data.id, 0)"
            >
              <v-icon>thumb_up</v-icon>
            </v-btn>
            <v-btn v-else text icon class="mr-4" @click="addLike(data.id, 1)">
              <v-icon>thumb_up</v-icon>
            </v-btn>
            <span>{{data.likes}}</span>
          </span>

          <span v-else class="mr-12">
            <v-btn text icon class="mr-4" @click="addLike(data.id, 1)">
              <v-icon>thumb_up</v-icon>
            </v-btn>

            <span>{{data.likes}}</span>
          </span>

          <span class="mr-12" v-if="data.self_response !== null">
            <v-btn
              text
              icon
              class="mr-4"
              color="red"
              v-if="data.self_response.is_like ==2"
              @click="addLike(data.id, 0)"
            >
              <v-icon>thumb_down</v-icon>
            </v-btn>

            <v-btn text icon class="mr-4" v-else @click="addLike(data.id, 2)">
              <v-icon>thumb_down</v-icon>
            </v-btn>

            <span>{{data.dislikes}}</span>
          </span>

          <span v-else class="mr-12">
            <v-btn text icon class="mr-4" @click="addLike(data.id, 2)">
              <v-icon>thumb_down</v-icon>
            </v-btn>

            <span>{{data.likes}}</span>
          </span>
        </v-col>
      </v-row>
    </v-card>
    <snack-bar :body="bodySnackBar"></snack-bar>
  </div>
</template>

<script>
import SnackBar from "../../components/SnackBar";
export default {
  components: {
    SnackBar
  },
  data() {
    return {
      url: "/reviews/1",
      datas: [],
      slug: this.$route.params.id,
      reviewSlug: this.$route.query.slug || '',
      coba: true,
      bodySnackBar: {
        timeout: 2000,
        message: "",
        snackbar: false
      }
    };
  },
  created() {
    this.bookId;
    this.getData();
  },
  methods: {
    getData() {
      this.$store.dispatch("setStatus", true);
      this.$http
        .get(
          `${this.$baseUrl}review?bookSlug=${this.slug}&userIncluded=1&orderBy=created_at&order=desc&slug=${this.reviewSlug}`
        )
        .then(result => {
          this.datas = result.data;

          this.$store.dispatch("setStatus", false);
        })
        .catch(error => {
          alert(error);
        });
    },
    addLike(reviewId, response) {
      const data = {
        is_like: response,
        review_id: reviewId
      };

      this.$store.dispatch("setStatus", false);
      this.$http
        .post(`${process.env.VUE_APP_API}review-response`, data)
        .then(result => {
          this.$store.dispatch("setStatus", true);
          this.bodySnackBar.message = "Success!";
          this.bodySnackBar.snackbar = true;
          this.getData();
        })
        .catch(err => {
          this.$store.dispatch("setStatus", true);
          this.bodySnackBar.message = "Failed";
          this.bodySnackBar.snackbar = true;
        });
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: black !important;
}
a:hover {
  text-decoration: underline;
}
.underline {
  text-decoration: underline;
}
</style>