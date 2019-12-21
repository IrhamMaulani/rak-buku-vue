<template>
  <div>
    <v-container
      v-if="datas.length <= 0 && reviewUser === null"
      class="fill-height d-flex justify-center mt-12"
      fluid
    >
      <v-img
        :src="require('../../assets/empty-review.svg')"
        max-height="625"
        contain
        class="mt-12"
      />
      <p class="title mt-12">Nothing Here. Write Review For This Book</p>
    </v-container>
    <v-card v-else class="mb-4" v-for="(data,index) in datas" :key="index">
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
          <p class="title ma-0">{{data.title}}</p>
        </v-col>
      </v-row>
      <v-row justify="center" class="mt-n6">
        <v-col cols="1" :class="{'mr-12' : $vuetify.breakpoint.smAndDown }"></v-col>
        <v-col cols="10" class="ml-n8">
          <span class="mr-6">{{data.created_at}}</span>
          <span class="underline">{{data.user.name}}</span>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" class="px-10 text-left">
          <p class="mx-12">{{data.content | snippet(contentLength)}}</p>
        </v-col>

        <v-btn text class="ml-auto mr-12" @click="contentLength = 100000">Read More</v-btn>
      </v-row>
      <v-row justify="center" class="mt-n8">
        <v-col cols="1"></v-col>
        <v-col v-if="!isLoggedIn" cols="11" class="mb-4 ml-12 d-flex flex-row justify-start">
          <span class="mr-12">
            <v-icon class="mr-4">thumb_up</v-icon>
            <span>{{data.likes}}</span>
          </span>

          <span class="mr-12">
            <v-icon class="mr-4">thumb_down</v-icon>
            <span>{{data.dislikes}}</span>
          </span>
        </v-col>
        <v-col v-else cols="11" class="mb-4 ml-12 d-flex flex-row justify-start">
          <span v-if="data.self_response !== null" class="mr-12">
            <v-btn
              v-if="data.self_response.is_like === 1"
              text
              icon
              class="mr-4"
              color="blue"
              @click="addLike(data.id, 0, 'likes')"
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
              @click="addLike(data.id, 0, 'dislikes')"
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
      slug: this.$route.params.id || "",
      reviewSlug: this.$route.query.slug || "",
      coba: true,
      bodySnackBar: {
        timeout: 2000,
        message: "",
        snackbar: false
      },
      contentLength: 50,
      page: 1,
      nextPageUrl: "",
      checked: true,
      like: false
    };
  },
  props: {
    reviewUser: Object
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
          `${this.$baseUrl}review?bookSlug=${this.slug}&userIncluded=0&orderBy=created_at&order=desc&slug=${this.reviewSlug}&page=${this.page}`
        )
        .then(result => {
          const datas = result.data.data;

          datas.forEach(element => {
            console.log(element.id);
            this.datas.push(element);
          });

          const coba = this.datas;

          this.nextPageUrl = result.data.next_page_url;

          this.$store.dispatch("setStatus", false);
        })
        .catch(error => {
          alert(error);
        });
    },
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
          ) +
            window.innerHeight ===
          document.documentElement.offsetHeight;

        if (this.checked) {
          //stupid condition when stupid mounted keep persistent in another route
          if (bottomOfWindow) {
            if (this.nextPageUrl !== null) {
              this.page = this.page + 1;
              this.like = false;
              this.getData(this.page);
            }
          }
        }
      };
    },
    addLike(reviewId, response, type = "") {
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
          const updatedItem = this.datas.find(element => {
            return element.id === reviewId;
          });

          if (response === 1) {
            updatedItem.likes = updatedItem.likes + 1;
            if (updatedItem.dislikes !== 0) {
              updatedItem.dislikes = updatedItem.dislikes - 1;
            }
          } else if (response === 2) {
            updatedItem.dislikes = updatedItem.dislikes + 1;
            if (updatedItem.likes !== 0) {
              updatedItem.likes = updatedItem.likes - 1;
            }
          } else {
            if (type === "likes") {
              updatedItem.likes = updatedItem.likes - 1;
            } else if (type === "dislikes") {
              updatedItem.dislikes = updatedItem.dislikes - 1;
            }
          }

          updatedItem.self_response.is_like = response;
          this.$store.dispatch("setStatus", false);
        })
        .catch(err => {
          this.$store.dispatch("setStatus", true);
          this.bodySnackBar.message = "Failed";
          this.bodySnackBar.snackbar = true;
        });
    }
  },
  mounted() {
    this.scroll();
  },
  destroyed() {
    //stupid variable when stupid mounted keep persistent in another route
    this.checked = false;
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
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