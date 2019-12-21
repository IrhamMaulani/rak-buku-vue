<template>
  <review-book :detail="detail" />
</template>

<script>
import ReviewBook from "../user/ReviewBookContent";
export default {
  components: {
    ReviewBook: ReviewBook
  },
  data() {
    return {
      detail: {
        url: "review?userIncluded=0&",
        isUser: 1
      }
    };
  }
};
</script>

<style>
</style>