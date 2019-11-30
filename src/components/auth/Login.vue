<template>
  <v-app class="white mt-5">
    <v-overlay :value="authStatus === 'loading'">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-content>
      <v-container class="fill-height mt-n12" fluid>
        <v-row align="center" justify="center">
          <v-col cols="10">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-spacer></v-spacer>
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <div class="text-center red--text title">{{ authMessage }}</div>
                <form v-on:submit.prevent>
                  <v-text-field
                    v-model="email"
                    label="email"
                    name="login"
                    prepend-icon="email"
                    type="text"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    v-model="password"
                  />
                  <div class="text-center mb-2">
                    <v-btn color="primary" v-on:click="login">Login</v-btn>
                  </div>
                </form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data() {
    return {
      email: "",
      password: "",
      token: localStorage.getItem("token"),
      rememberMe: false
    };
  },
  methods: {
    login() {
      const email = this.email;
      const password = this.password;
      const rememberMe = this.rememberMe;

      this.$store
        .dispatch("login", { email, password, rememberMe })
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
    }
  },
  computed: {
    authStatus() {
      return this.$store.getters.authStatus;
    },
    authMessage() {
      return this.$store.getters.authMessage;
    }
  }
};
</script>
<style scoped>
.white {
  background-color: white !important;
}
</style>
