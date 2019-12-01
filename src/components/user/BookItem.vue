<template>
  <v-row class="mt-6">
    <v-col cols="12" md="7" lg="7">
      <div v-if="book.book_images_cover !== null">
        <v-img
          :src="book.book_images_cover.name"
          lazy-src="https://picsum.photos/id/11/10/6"
          height="825"
        />
      </div>
      <div v-else>
        <v-img
          :src="require('../../assets/cover-book.jpg')"
          lazy-src="https://picsum.photos/id/11/10/6"
          height="825"
        />
      </div>
    </v-col>

    <v-col cols="12" md="5" lg="5" class>
      <v-row class="white mt-12">
        <v-col cols="6" class="border border-right text-center">
          <p class="display-3 font-weight-black">{{book.score}}</p>
        </v-col>
        <v-col cols="6" class="border border-right">
          <p class="subtitle-1">
            <router-link v-for="(tag, index) in book.tags" :key="tag.id" :to="url">
              <span v-if="index != 0">{{', '}}</span>
              <span>{{tag.name}}</span>
            </router-link>
          </p>
        </v-col>
      </v-row>
      <p class="display-2 font-weight-bold mt-12">{{book.title}}</p>

      <v-row class="white mt-12">
        <v-col cols="6" class>
          <p>Vol {{book.volume}}</p>
          <p>
            Pengarang :
            <router-link v-for="(author, index) in book.authors" :key="index" :to="url">
              <span v-if="index != 0">{{', '}}</span>
              <span>{{author.name}}</span>
            </router-link>
          </p>
          <p>Publisher : {{book.publisher.name}}</p>
          <p>Tahun Terbit : {{book.print_year}}</p>
          <p>Origin Langauge : {{book.origin_language}}</p>
          <p class="title">IS OWNED</p>

          <v-select
            :items="statuses"
            v-model="status"
            item-text="name"
            return-object
            label="Status Read"
            v-on:change="addStatus"
          ></v-select>
          <v-select
            :items="scores"
            v-model="userScore"
            item-text="id"
            item-value="id"
            label="Your Scores"
            v-on:change="addScore"
          ></v-select>
        </v-col>
        <v-col cols="6" class>
          <p class="body-2">{{book.description}}</p>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" md="12" lg="12">
      <h1>Reviews</h1>
      <div class="d-flex justify-end">
        <v-icon class="mr-1 mb-4">create</v-icon>
        <router-link :to="reviewUrl">
          <p class="mr-5">Write Review</p>
        </router-link>
        <router-link :to="reviewUrl">
          <p>More Reviews</p>
        </router-link>
      </div>
      <v-divider class="mb-6"></v-divider>
      <review />
    </v-col>
  </v-row>
</template>

<script>
import Review from "../user/Review";
export default {
  components: {
    review: Review
  },
  created() {
    this.getData();
  },
  data() {
    return {
      url: "",
      reviewUrl: "1/reviews",
      statuses: [
        { id: 1, name: "Wish List" },
        { id: 2, name: "On Hold" },
        { id: 3, name: "Dropped" },
        { id: 4, name: "Completed" },
        { id: 5, name: "Re-reading" }
      ],
      scores: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 },
        { id: 10 }
      ],
      book: {
        book_images_cover: {},
        publisher: {}
      },
      slug: this.$route.params.id,
      status: {},
      userScore: {}
    };
  },
  methods: {
    getData() {
      this.$store.dispatch("setStatus", true);
      this.$http
        .get(`${this.$baseUrl}book/${this.slug}`)
        .then(result => {
          this.book = result.data;

          let score = "";
          let status = "";

          if (result.data.user_score !== null) {
            score = result.data.user_score.score;
          }
          if (result.data.check_bookmarked !== null) {
            status = result.data.check_bookmarked.status;
          }

          this.statusAndScoreGetData(status, score);
          this.$store.dispatch("setStatus", false);
        })
        .catch(error => {
          alert(error);
        });
    },
    statusAndScoreGetData(statusParam, scoreParam) {
      const status = this.statuses.find(x => x.name === statusParam);
      const score = this.scores.find(x => x.id === scoreParam);

      this.status = status;
      this.userScore = score;
    },
    addStatus() {
      const data = {
        status: this.status.name,
        is_owned: 0,
        book_id: this.book.id
      };

      this.$store.dispatch("setStatus", false);
      this.$http
        .post(`${process.env.VUE_APP_API}bookmark`, data)
        .then(result => {
          this.$store.dispatch("setStatus", true);
          this.getData();
        })
        .catch(err => {
          alert(error);
        });
    },
    addScore() {
      const data = {
        score: this.userScore,
        book_id: this.book.id
      };
      this.$store.dispatch("setStatus", false);

      this.$http
        .post(`${process.env.VUE_APP_API}score`, data)
        .then(result => {
          this.$store.dispatch("setStatus", true);
          this.getData();
        })
        .catch(err => {
          alert(error);
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
.border {
  border-bottom: 2px solid rgba(0, 0, 0, 0.363) !important;
  /* border-right: 2px solid rgba(0, 0, 0, 0.363) !important; */
  border-radius: 0px !important;
}
.border-right:first-child {
  border-right: 2px solid rgba(0, 0, 0, 0.363) !important;
  border-radius: 0px !important;
}
</style>