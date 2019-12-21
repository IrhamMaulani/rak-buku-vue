<template>
  <div>
    <v-container class="fill-height d-flex justify-center mt-12" fluid>
      <v-img :src="require('../assets/404.svg')" contain max-height="500" />
    </v-container>
    <h1 class="display-2 text-center">We all feel lost sometimes</h1>
    <br />
    <p class="headline text-center">- 404 Page Not Found</p>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    click: function() {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
</style>