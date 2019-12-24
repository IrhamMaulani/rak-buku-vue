<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list dense>
        <template v-for="item in items">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-col>
            <v-col cols="6" class="text-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-col>
          </v-row>

          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{ item.text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <router-link v-for="(child, i) in item.children" :key="i" @click :to="child.url">
              <v-list-item>
                <v-list-item-action v-if="child.icon">
                  <v-icon>{{ child.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ child.text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </router-link>
          </v-list-group>
          <router-link v-else :key="item.text" :to="item.url">
            <v-list-item>
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="primary" dark>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span class="hidden-sm-and-down">Rak Buku</span>
      </v-toolbar-title>

      <div class="flex-grow-1"></div>

      <v-btn text class="pa-0" @click="openDialog">
        <v-icon>power_settings_new</v-icon>
        <span class="hidden-sm-and-down ml-2">Log Out</span>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container class="fill-height" fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <dialog-confirm :body="bodyDialog" v-on:confirmDialog="logOut"></dialog-confirm>
  </v-app>
</template>

<script>
import DialogConfirm from "../components/DialogConfirm";
export default {
  components: {
    DialogConfirm
  },
  props: {
    source: String
  },
  data: () => ({
    bodyDialog: {
      dialog: false,
      message: "Are You Sure Want To Logout?",
      title: "Logout"
    },
    drawer: null,
    items: [
      { icon: "home", text: "Home", url: "/admin/home" },
      {
        icon: "keyboard_arrow_up",
        "icon-alt": "keyboard_arrow_down",
        text: "Books",
        model: false,
        children: [
          { icon: "style", text: "Add Tag", url: "/admin/add-tag" },
          {
            icon: "store",
            text: "Add New Publisher",
            url: "/admin/add-publisher"
          },
          {
            icon: "brush",
            text: "Add New Author",
            url: "/admin/add-author"
          },
          { icon: "menu_book", text: "Add New Book", url: "/admin/add-book" }
        ]
      },
      {
        icon: "keyboard_arrow_up",
        "icon-alt": "keyboard_arrow_down",
        text: "User",
        model: false,
        children: [
          { icon: "person_add", text: "Add New User", url: "/admin/add-user" }
        ]
      },
      { icon: "home_work", text: "To Rak Buku", url: "/" }
    ]
  }),
  methods: {
    logOut() {
      this.$store
        .dispatch("logout")
        .then(() => {
          this.$store.dispatch("setStatus", false);
          this.$router.push("/login");
          window.location.reload();
        })
        .catch(err => console.log(err));
    },
    openDialog() {
      this.bodyDialog.dialog = true;
    }
  }
};
</script>

<style scoped>
a {
  /* margin-left: 15px; */
  text-decoration: none;
}
</style>