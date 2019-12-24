<template>
  <v-app>
    <v-card>
      <v-card-title>
        <div class="flex-grow-1"></div>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="datas"
        :search="search"
        :sort-by="['id']"
        :sort-desc="[true]"
        item-key="datas"
        class="elevation-1"
        :loading="loading.loading"
        :loading-text="loading.message"
      >
        <template v-slot:item.action="{ item }">
          <v-icon small class="mr-2" v-on:click="editItem(item)">edit</v-icon>
          <v-icon small @click="deleteItem(item)">delete</v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-app>
</template>
<script>
export default {
  template: {
    coba: `dada`
  },
  data() {
    return {
      search: "",
      datas: [],
      headers: [
        { text: "Id", value: "id" },
        { text: "Name", value: "name" },
        { text: "Actions", value: "action", sortable: false }
      ],
      loading: {
        loading: true,
        message: "Loading... Please wait"
      }
    };
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
    this.getData();
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
    },
    getData() {
      this.$http
        .get(this.$baseUrl + "admin/tag")
        .then(result => {
          this.loading.loading = true;
          const data = result.data;
          this.datas = data;
        })
        .catch(error => {
          alert(error);
          this.loading.message = "" + error;
        });
    }
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