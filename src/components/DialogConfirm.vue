<template>
  <v-dialog v-model="body.dialog" max-width="290">
    <v-card>
      <v-card-title class="headline">{{body.title}}</v-card-title>
      <v-card-text>{{body.message}}</v-card-text>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="green darken-1" text @click="body.dialog = false">No</v-btn>
        <v-btn
          color="green darken-1"
          text
          v-on:click="confirmDialog"
          @click="body.dialog = false"
        >Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    body: {
      type: Object,
      required: true
    }
  },
  methods: {
    confirmDialog() {
      this.$emit("confirmDialog");
    }
  }
};
</script>

<style>
</style>