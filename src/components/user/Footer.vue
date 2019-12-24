<template>
  <div class="d-flex align-content-start flex-wrap">
    <router-link v-for="footer in footers" class="pa-3 ma-0" :to="footer.url">
      <p class="pa-0 ma-0 body-2">{{footer.text}}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      footers: [
        // { text: "Help", url: "" },
        { text: "About", url: "about" },
        { text: "Terms", url: "term" },
        { text: "Careers", url: "career" },
        { text: "Privacy", url: "privacy" }
      ]
    };
  }
};
</script>

<style scoped>
.red {
  background-color: red;
}
a {
  text-decoration: none;
  color: #8e8e8e !important;
}
a:hover {
  text-decoration: underline;
}
</style>