<template>
  <v-app>
    {{coba}}
    <v-card>
      <v-card-title>
        <div class="flex-grow-1"></div>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="datas.data"
        :search="search"
        :sort-by="['id']"
        :sort-desc="[true]"
        item-key="datas"
        class="elevation-1"
        :loading="loading.loading"
        :loading-text="loading.message"
      >
        <template v-slot:item.reputation="{ item }">
          <li>{{item.reputation.name }}</li>
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon small class="mr-2" v-on:click="editItem(item)">edit</v-icon>
          <v-icon small @click="deleteItem(item)">delete</v-icon>
        </template>
        <template v-slot:item.roles="{ item }">
          <ul v-for="data in item.roles">
            <li v-if="checkArray(item.roles)">{{data.name }}</li>
          </ul>
        </template>
      </v-data-table>
    </v-card>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      search: "",
      coba: process.env.VUE_APP_TITLE,
      headers: [
        { text: "Id", value: "id" },
        { text: "Name", value: "name" },
        { text: "Email", value: "email" },
        { text: "Reputation", value: "reputation" },
        { text: "Roles", value: "roles" },
        { text: "Actions", value: "action", sortable: false }
      ],
      loading: {
        loading: true,
        message: "Loading... Please wait"
      }
    };
  },
  computed: {
    datas() {
      return this.$store.getters.users;
    }
  },
  watch: {
    datas() {
      //watch loading when data load
      let loading = this.loading.loading;
      this.loading.loading = loading == false ? true : false;
      this.loading.message = loading == false ? "Loading... Please wait" : " ";
    }
  },
  created() {
    // this.getData();

    this.$store.dispatch("getUsers");
  },
  methods: {
    checkArray(item) {
      return Array.isArray(item) ? true : false;
    },
    editItem: function(item) {
      this.$emit("editItem", item);
    },
    deleteItem(item) {
      this.$emit("deleteItem", item);
    }
    // getData() {
    //   this.$http
    //     .get(this.$baseUrl + "admin/user")
    //     .then(result => {
    //       this.loading.loading = true;
    //       const data = result.data.data;
    //       this.datas = data;
    //     })
    //     .catch(error => {
    //       alert(error);
    //       this.loading.message = "" + error;
    //     });
    // }
  }
};
</script>
<style scoped>
ul,
li {
  list-style: none;
  display: inline;
}
</style>