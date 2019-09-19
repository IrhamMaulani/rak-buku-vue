<template>
  <v-row justify="center">
    <v-dialog v-model="progress" persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Please stand by
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    progress: {
      required: true,
      type: Boolean
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
.transparent {
  background-color: transparent !important;
  opacity: 0;
  border-color: transparent !important;
}
</style>