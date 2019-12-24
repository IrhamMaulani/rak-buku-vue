<template>
  <v-container>
    <v-app>
      <!-- <v-card> -->
      <v-card class="mx-4 mt-12 pa-0" max-width="490">
        <v-card-text>
          <p class="title">Hello, Admin {{userName}}</p>
        </v-card-text>
      </v-card>

      <v-row class="mt-12">
        <v-col cols="12" sm="4">
          <v-card class="pa-2 mr-2 ml-4" outlined tile>
            <v-container>
              <div class="d-flex justify-center">
                <v-avatar size="100" color="teal lighten-4" class="d-flex">
                  <v-icon x-large color="indigo accent-4">menu_book</v-icon>
                </v-avatar>
              </div>
              <div class="d-flex justify-center mt-8">
                <p class="title">Total Book : {{bookCount}}</p>
              </div>
            </v-container>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4">
          <v-card class="pa-2 mr-2 ml-4" outlined tile>
            <v-container>
              <div class="d-flex justify-center">
                <v-avatar size="100" color="deep-purple darken-1">
                  <v-icon x-large color="deep-purple lighten-4">person_pin</v-icon>
                </v-avatar>
              </div>
              <div class="d-flex justify-center mt-8">
                <p class="title">Total User : {{userCount}}</p>
              </div>
            </v-container>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4">
          <v-card class="pa-2 mr-2 ml-4" outlined tile>
            <v-container>
              <div class="d-flex justify-center">
                <v-avatar size="100" color="pink lighten-1">
                  <v-icon x-large color="pink lighten-5">edit</v-icon>
                </v-avatar>
              </div>
              <div class="d-flex justify-center mt-8">
                <p class="title">Total Author : {{authorCount}}</p>
              </div>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
      <!-- </v-card> -->
    </v-app>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      bookCount: null,
      userCount: null,
      authorCount: null
    };
  },
  created() {
    this.getData();
  },

  methods: {
    getData() {
      this.$http
        .get(this.$baseUrl + "admin/home")
        .then(result => {
          const data = result.data;
          this.bookCount = data.book_count;
          this.userCount = data.user_count;
          this.authorCount = data.author_count;
        })
        .catch(error => {
          alert(error);
        });
    }
  },
  computed: {
    userName() {
      return this.$store.getters.userName;
    }
  }
};
</script>

<style>
</style>