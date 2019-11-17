<template>
  <v-app class="white">
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: "app",
  created() {}
};
</script>

<style>
.white {
  background-color: white !important;
}
</style>
