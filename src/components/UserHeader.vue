<template>
  <div>
    <v-app-bar elevate-on-scroll color="white" flat>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
      <v-container :class="{'mt-12' : !$vuetify.breakpoint.smAndDown }">
        <v-layout justify-center>
          <v-flex xs12 lg8 md10 class="d-flex justify-start">
            <v-toolbar-title>Rak Buku</v-toolbar-title>
            <router-link
              v-for="item in items"
              :key="item.title"
              :to="item.url"
              class="hidden-sm-and-down"
            >
              <v-btn text>{{ item.title }}</v-btn>
            </router-link>
            <v-spacer></v-spacer>
            <div>
              <v-text-field
                v-model="searchQuery"
                solo
                flat
                hint
                placeholder="Search"
                class="hidden-sm-and-down"
              ></v-text-field>
            </div>
            <v-btn @click="doSearch" icon class="hidden-sm-and-down">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <div v-if="isLoggedIn">
              <v-menu offset-y class="ml-auto">
                <template v-slot:activator="{ on }">
                  <v-btn text class="click-custom mt-2" v-on="on">
                    <v-icon class>person</v-icon>
                    <span class="mx-1">{{userName}}</span>
                    <v-icon class>keyboard_arrow_down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <router-link v-for="(item, index) in lists" :key="index" :to="item.url">
                    <v-list-item @click="helper(item.method)">
                      <v-list-item-title>
                        <v-icon class="mr-2">{{item.icon}}</v-icon>
                        {{ item.title }}
                      </v-list-item-title>
                    </v-list-item>
                  </router-link>
                </v-list>
              </v-menu>
            </div>
            <div v-else>
              <v-menu offset-y class="ml-auto">
                <template v-slot:activator="{ on }">
                  <v-btn text class="click-custom mt-2" v-on="on">
                    <v-icon class>person</v-icon>
                    <span class="mx-1">Hello Guest</span>
                    <v-icon class>keyboard_arrow_down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <router-link v-for="(item, index) in listsGuest" :key="index" :to="item.url">
                    <v-list-item @click>
                      <v-list-item-title>
                        <v-icon class="mr-2">{{item.icon}}</v-icon>
                        {{ item.title }}
                      </v-list-item-title>
                    </v-list-item>
                  </router-link>
                </v-list>
              </v-menu>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item>
        <!-- <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>-->

        <v-list-item-content>
          <v-list-item-title>Rak Buku</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <router-link v-for="item in items" :key="item.title" :to="item.url">
        <v-list dense>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </router-link>
      <v-list-item>
        <v-text-field v-model="searchQuery" flat hint placeholder="Search"></v-text-field>

        <v-btn icon>
          <v-icon @click="doSearch">mdi-magnify</v-icon>
        </v-btn>
      </v-list-item>
    </v-navigation-drawer>
    <v-container>
      <v-layout align-center justify-center>
        <v-flex xs12 lg8 md10>
          <router-view></router-view>
        </v-flex>
      </v-layout>
    </v-container>
    <v-overlay :value="status">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <dialog-confirm :body="bodyDialog" v-on:confirmDialog="logOut"></dialog-confirm>
  </div>
</template>

<script>
import DialogConfirm from "../components/DialogConfirm";
export default {
  components: {
    DialogConfirm
  },
  data() {
    return {
      lists: [
        { title: "Profile", icon: "person", url: "/profile" },
        { title: "Setting", icon: "settings", url: "/admin/add-user" },
        { title: "Log Out", icon: "exit_to_app", url: "", method: "coba" }
      ],
      listsGuest: [
        { title: "Login", icon: "exit_to_app", url: "/login" },
        { title: "Sign Up", icon: "create", url: "/sign-up" }
      ],
      drawer: null,
      items: [
        { title: "Home", icon: "dashboard", url: "/" },
        { title: "Books", icon: "menu_book", url: "/book" },
        { title: "Reviews", icon: "record_voice_over", url: "/reviews" }
      ],
      searchQuery: "",
      bodyDialog: {
        dialog: false,
        message: "Are You Sure Want To Logout?",
        title: "Logout"
      },
      overLay: false
    };
  },
  methods: {
    click: function() {},
    doSearch() {
      // alert(this.searchQuery);

      this.$router
        .replace({ path: "/book", query: { search: this.searchQuery } })
        .catch(err => {});
    },
    logOut() {
      this.$store.dispatch("setStatus", true);
      this.$store
        .dispatch("logout")
        .then(() => {
          this.$store.dispatch("setStatus", false);
          window.location.reload();
        })
        .catch(err => console.log(err));
    },
    coba() {
      alert("coba");
    },
    helper(method) {
      // alert(method);
      if (method !== undefined) {
        this.bodyDialog.dialog = true;
        // this[method]();
      }
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    userName() {
      return this.$store.getters.userName;
    },
    status() {
      return this.$store.getters.status;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  text-decoration: none;
  color: black !important;
}
.inline-block {
  display: inline;
}

.click-custom {
  cursor: pointer;
}
</style>