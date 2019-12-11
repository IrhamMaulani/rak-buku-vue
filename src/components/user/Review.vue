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
          <span class="mr-12">
            <v-icon class="mr-4">thumb_up</v-icon>
            <span>{{data.likes}}</span>
          </span>

          <span class="mr-12">
            <v-icon class="mr-4">thumb_down</v-icon>
            <span>{{data.dislikes}}</span>
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
</template>

<script>
export default {
  data() {
    return {
      url: "/reviews/1",
      datas: [],
      slug: this.$route.params.id
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
          `${this.$baseUrl}review?bookSlug=${this.slug}&orderBy=created_at&order=desc`
        )
        .then(result => {
          this.datas = result.data;

          this.$store.dispatch("setStatus", false);
        })
        .catch(error => {
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
.underline {
  text-decoration: underline;
}
</style>