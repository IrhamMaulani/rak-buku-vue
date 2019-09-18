<template>
  <div class="text-center">
    <v-snackbar v-model="body.snackbar" :timeout="body.timeout">
      {{ body.message }}
      <v-btn color="blue" text @click="body.snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: {
    body: {
      type: Object,
      required: true
    }
  },
  data: () => ({})
};
</script>

<style>
</style>