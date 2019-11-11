<template>
  <div>
    <v-app-bar color="white" flat>
      <v-content>
        <v-container>
          <v-layout align-center justify-center>
            <v-flex xs12 md8>
              <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>

              <!-- <v-spacer class="hidden-md-and-up"></v-spacer> -->
              <h1 style="display:inline-block" class="mr-8">Rak Buku</h1>
              <div class="hidden-sm-and-down" style="display:inline-block">
                <router-link v-for="item in items" :key="item.title" :to="item.url">
                  <v-btn text>
                    <!-- <router-link :to="item.url">{{ item.title }}</router-link> -->
                    {{ item.title }}
                  </v-btn>
                </router-link>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
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
    </v-navigation-drawer>
    <v-container>
      <v-layout align-center justify-center>
        <v-flex xs12 md8>
          <router-view></router-view>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
  /* margin-left: 15px; */
  text-decoration: none;
}
</style>