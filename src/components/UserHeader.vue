<template>
  <div>
    <v-app-bar color="white" flat>
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
              <v-text-field solo flat hint placeholder="Search" class="hidden-sm-and-down"></v-text-field>
            </div>
            <v-btn icon class="hidden-sm-and-down">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <v-menu offset-y class="ml-auto">
              <template v-slot:activator="{ on }">
                <v-button class="click-custom mt-2" v-on="on">
                  <v-icon class>person</v-icon>
                  <span class="mx-1">Irham</span>
                  <v-icon class>keyboard_arrow_down</v-icon>
                </v-button>
              </template>
              <v-list>
                <v-list-item v-for="(item, index) in items" :key="index" @click>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
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
        <v-text-field flat hint placeholder="Search"></v-text-field>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-list-item>
    </v-navigation-drawer>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me 2" }
      ],
      drawer: null,
      items: [
        { title: "Home", icon: "dashboard", url: "/" },
        { title: "Books", icon: "menu_book", url: "/admin/add-user" },
        { title: "My Books", icon: "bookmarks", url: "/add-blog" }
      ]
    };
  },
  methods: {
    click: function() {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  text-decoration: none;
}
.inline-block {
  display: inline;
}

.click-custom {
  cursor: pointer;
}
</style>