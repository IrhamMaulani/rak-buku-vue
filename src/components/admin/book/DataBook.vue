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
        :items-per-page="6"
      >
        <template v-slot:item.book_images_cover.name="{ item }">
          <span v-if="item.book_images_cover !== null">
            <v-avatar width="100" height="100" class="my-2" tile>
              <img
                :src="`http://localhost/rak-buku-web/public/storage/${item.book_images_cover.name}`"
              />
            </v-avatar>
          </span>
          <span v-else>
            <v-avatar color="blue" tile width="100" height="100" class="my-2">
              <span class="white--text headline">{{getFirstCharacter(item.title)}}</span>
            </v-avatar>
          </span>
        </template>
        <template v-slot:item.authors="{ item }">
          <ul v-for="author in item.authors">
            <li v-if="checkArray(item.authors)">{{author.name }}</li>
          </ul>
        </template>
        <template v-slot:item.tags="{ item }">
          <ul v-for="tag in item.tags">
            <li v-if="checkArray(item.tags)">{{tag.name }}</li>
          </ul>
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
      search: "",
      datas: [],
      headers: [
        { text: "Id", value: "id" },
        { text: "Cover Image", value: "book_images_cover.name" },
        { text: "Title", value: "title" },
        { text: "Edition", value: "edition" },
        { text: "Print Year", value: "print_year" },
        { text: "Origin Language", value: "origin_language" },
        { text: "Authors", value: "authors" },
        { text: "Tag", value: "tags" },
        { text: "Publisher", value: "publisher.name" },
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
        .get(this.$baseUrl + "admin/book")
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
</style>