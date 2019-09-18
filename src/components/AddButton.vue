<template>
  <v-btn v-on:click="openComponent" bottom color="pink" dark fab fixed right>
    <v-icon>mdi-plus</v-icon>
  </v-btn>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    openComponent: function() {
      this.$emit("openComponent");
    }
  }
};
</script>