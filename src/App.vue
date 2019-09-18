<template>
  <v-app>
    <component :is="component">
      <router-view slot="body-content"></router-view>
    </component>
  </v-app>
</template>

<script>
import Header from "./components/Header.vue";

export default {
  name: "app",
  components: {
    "navbar-header": Header
  },
  data() {
    return {
      component: "navbar-header"
    };
  }
};
</script>

<style>
</style>
