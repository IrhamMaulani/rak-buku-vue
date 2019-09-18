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
        item-key="datas"
        class="elevation-1"
        :loading="loading.loading"
        :loading-text="loading.message"
      >
        <!-- TODO use props in parent -->
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
  template: {
    coba: `dada`
  },
  props: {
    headers: {
      type: Array,
      required: true
    },
    datas: {
      type: Array,
      required: true
    },
    loading: {
      type: Object,
      required: true
    }
    //TODO Check IF collumn contain array or Not
    // containArray : {
    //   type
    // }
  },
  data() {
    return {
      search: ""
    };
  },
  created() {},
  methods: {
    checkArray(item) {
      return Array.isArray(item) ? true : false;
    },
    editItem: function(item) {
      // console.log(item.id);
      this.$emit("editItem", item);
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