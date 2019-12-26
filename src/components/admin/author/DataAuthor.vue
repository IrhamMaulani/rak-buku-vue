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
        :items-per-page="5"
      >
        <template v-slot:item.author_image.name="{ item }">
          <span v-if="item.author_image !== null">
            <v-avatar width="60" height="60" class="my-4">
              <img :src="`${url}${item.author_image.name}`" />
            </v-avatar>
          </span>
          <span v-else>
            <v-avatar color="blue" width="60" height="60" class="my-4">
              <span class="white--text headline">{{getFirstCharacter(item.name)}}</span>
            </v-avatar>
          </span>
        </template>
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
      url: process.env.VUE_APP_IMAGE,
      search: "",
      datas: [],
      headers: [
        { text: "Id", value: "id" },
        { text: "Author Image", value: "author_image.name" },
        { text: "Name", value: "name" },
        { text: "Pen Name", value: "pen_name" },
        { text: "Birth Place", value: "birth_place" },
        { text: "Birth Date", value: "birth_date" },
        { text: "Residence Place", value: "residence_place" },
        { text: "User Inputed", value: "user.name" },
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
    getFirstCharacter(name) {
      return name.charAt(0);
    },
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
        .get(this.$baseUrl + "admin/author")
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