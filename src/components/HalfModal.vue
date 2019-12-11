<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="1200px" persistent>
      <template v-slot:activator="{ on }">
        <!-- <v-btn color="primary" dark v-on="on">Open Dialog</v-btn> -->
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{title}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <slot name="form-content"></slot>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text v-on:click="saveData">{{save}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    title: "",
    save: ""
  }),
  methods: {
    openModal(title, save) {
      this.dialog = true;
      this.title = title;
      this.save = save;
    },
    saveData() {
      this.$emit("saveData");
    }
  }
};
</script>

<style>
</style>