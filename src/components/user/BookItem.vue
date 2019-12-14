<template>
  <v-row class="mt-6">
    <v-col cols="12" md="7" lg="7">
      <div v-if="book.book_images_cover !== null">
        <v-img
          :src="`${url}storage/${book.book_images_cover.name}`"
          lazy-src="https://picsum.photos/id/11/10/6"
          height="1200"
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
            <router-link
              v-for="(tag, index) in book.tags"
              :key="tag.id"
              :to="{ path: '/book', query: {tag: tag.name } }"
            >
              <span v-if="index != 0">{{', '}}</span>
              <span>{{tag.name}}</span>
            </router-link>
          </p>
        </v-col>
      </v-row>
      <p class="display-2 font-weight-bold mt-12">{{book.title}}</p>

      <v-row class="white mt-12">
        <v-col cols="6" class>
          <div class="mb-4">
            <span>Vol {{book.volume}}</span>
            <span class="ml-8">Edition {{book.edition}}</span>
          </div>
          <p>
            Pengarang :
            <router-link
              v-for="(author, index) in book.authors"
              :key="index"
              :to="{ path: '/book', query: {author: author.name } }"
            >
              <span v-if="index != 0">{{', '}}</span>
              <span>{{author.name}}</span>
            </router-link>
          </p>
          <p>
            Publisher :
            <router-link
              :to="{ path: '/book', query: {publisher: book.publisher.name } }"
            >{{book.publisher.name}}</router-link>
          </p>
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
        <div v-if="alreadyReviewed">
          <v-btn text small v-on:click="openModalEdit">
            <v-icon class="mr-1 mb-4">create</v-icon>
            <p class="mr-5">Edit Review</p>
          </v-btn>
        </div>
        <div v-else>
          <v-btn text small v-on:click="openModal">
            <v-icon class="mr-1 mb-4">create</v-icon>
            <p class="mr-5">Add Review</p>
          </v-btn>
        </div>

        <router-link :to="reviewUrl">
          <p>More Reviews</p>
        </router-link>
      </div>
      <v-divider class="mb-6"></v-divider>

      <div v-if="book.user_review !== null">
        <v-card class="mb-4">
          <v-row>
            <v-col
              cols="1"
              class="ml-12 mt-4 text-center pr-0"
              :class="{'mr-8' : $vuetify.breakpoint.smAndDown }"
            >
              <v-avatar size="40" class="ma-0">
                <v-img
                  v-if="book.user_review.user.image_profile !== null"
                  :src="`${url}storage/${book.user_review.user.image_profile.name}`"
                  lazy-src="https://picsum.photos/id/11/10/6"
                  class="ma-0"
                />
              </v-avatar>
            </v-col>
            <v-col cols="8" class="mt-4 pl-0">
              <router-link :to="url">
                <p class="title ma-0">{{book.user_review.title}}</p>
              </router-link>
            </v-col>
          </v-row>
          <v-row justify="center" class="mt-n6">
            <v-col cols="1" :class="{'mr-12' : $vuetify.breakpoint.smAndDown }"></v-col>
            <v-col cols="10" class="ml-n8">
              <span class="mr-6">
                <router-link :to="url">{{book.user_review.created_at}}</router-link>
              </span>
              <span class="underline">
                <router-link :to="url">{{book.user_review.user.name}} (Your Review)</router-link>
              </span>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" class="px-10 text-left">
              <p class="mx-12">{{book.user_review.content}}</p>
            </v-col>

            <p class="ml-auto mr-12">
              <router-link :to="url">Read More</router-link>
            </p>
          </v-row>
          <v-row justify="center" class="mt-n8">
            <v-col cols="1"></v-col>
            <v-col cols="11" class="mb-4 ml-12 d-flex flex-row justify-start">
              <span class="mr-12">
                <v-icon class="mr-4">thumb_up</v-icon>
                <span>1</span>
              </span>

              <span class="mr-12">
                <v-icon class="mr-4">thumb_down</v-icon>
                <span>100</span>
              </span>

              <span class="mr-12">
                <v-icon class="mr-4">mode_comment</v-icon>
                <span>
                  <router-link :to="url">100 Comments</router-link>
                </span>
              </span>
            </v-col>
          </v-row>
        </v-card>
      </div>

      <review ref="review" />
    </v-col>
    <snack-bar :body="bodySnackBar"></snack-bar>
    <half-modal ref="halfModal" v-on:saveData="submitReview($event)">
      <div slot="form-content">
        <v-row>
          <v-col cols="12">
            <v-text-field label="Title" v-model="review.title" required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea name="input-7-1" label="Your Review" v-model="review.content" required></v-textarea>
          </v-col>
        </v-row>
      </div>
    </half-modal>
    <half-modal ref="editModal" v-on:saveData="updateReview($event)">
      <div slot="form-content">
        <v-row>
          <v-col cols="12">
            <v-text-field label="Title" v-model="reviewUpdate.title" required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              name="input-7-1"
              label="Your Review"
              v-model="reviewUpdate.content"
              required
            ></v-textarea>
          </v-col>
        </v-row>
      </div>
    </half-modal>
  </v-row>
</template>

<script>
import Review from "../user/Review";
import SnackBar from "../../components/SnackBar";
import HalfModal from "../../components/HalfModal";
export default {
  components: {
    review: Review,
    SnackBar,
    HalfModal
  },
  created() {
    this.getData();
  },
  data() {
    return {
      bodySnackBar: {
        timeout: 2000,
        message: "",
        snackbar: false
      },
      url: "http://localhost/rak-buku-web/public/",
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
        book_images_cover: null,
        publisher: {},
        user_review: {
          user: {
            image_profile: null
          }
        }
      },
      slug: this.$route.params.id,
      status: {},
      userScore: {},
      review: {
        title: "",
        content: "",
        slug: ""
      },
      reviewUpdate: {
        id: "",
        title: "",
        content: "",
        slug: ""
      },
      alreadyReviewed: false
    };
  },
  methods: {
    openModal() {
      this.$refs.halfModal.openModal("Add Reviews", "Submit");
    },
    openModalEdit() {
      this.$refs.editModal.openModal("Update Reviews", "Update");
    },
    submitReview() {
      this.review.slug = this.slug;
      this.$store.dispatch("setStatus", true);
      this.$http
        .post(`${process.env.VUE_APP_API}review`, this.review)
        .then(result => {
          this.$store.dispatch("setStatus", false);
          this.bodySnackBar.message = "Success Added Review!";
          this.bodySnackBar.snackbar = true;
          this.review.title = "";
          this.review.content = "";
          this.review.slug = "";
          this.$refs.halfModal.closeModal();
          this.$refs.review.getData();
        })
        .catch(err => {
          this.$store.dispatch("setStatus", false);
          this.bodySnackBar.message = "Failed";
          this.bodySnackBar.snackbar = true;
        });
    },
    updateReview() {
      this.$store.dispatch("setStatus", false);
      this.$http
        .post(
          `${process.env.VUE_APP_API}review/${this.reviewUpdate.id}/update`,
          this.reviewUpdate
        )
        .then(result => {
          this.$store.dispatch("setStatus", true);
          this.bodySnackBar.message = "Success Updated Review!";
          this.bodySnackBar.snackbar = true;
          this.$refs.editModal.closeModal();
          this.getData();
        })
        .catch(err => {
          this.$store.dispatch("setStatus", true);
          this.bodySnackBar.message = "Failed";
          this.bodySnackBar.snackbar = true;
        });
    },
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

          if (result.data.user_review !== null) {
            this.alreadyReviewed = true;

            this.reviewUpdate.id = result.data.user_review.id;
            this.reviewUpdate.title = result.data.user_review.title;
            this.reviewUpdate.content = result.data.user_review.content;
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
          this.bodySnackBar.message = "Success Added Status!";
          this.bodySnackBar.snackbar = true;
          this.getData();
        })
        .catch(err => {
          this.$store.dispatch("setStatus", true);
          this.bodySnackBar.message = "Failed";
          this.bodySnackBar.snackbar = true;
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
          this.bodySnackBar.message = "Success Scored Book!";
          this.bodySnackBar.snackbar = true;
          this.getData();
        })
        .catch(err => {
          this.$store.dispatch("setStatus", true);
          this.bodySnackBar.message = "Failed Scored Book!";
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