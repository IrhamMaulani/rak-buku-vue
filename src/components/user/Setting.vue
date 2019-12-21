<template>
  <v-card flat>
    <v-toolbar flat>
      <v-toolbar-title>Setting</v-toolbar-title>
    </v-toolbar>
    <v-tabs vertical>
      <v-tab class="ml-n1">
        <small>Your Review</small>
      </v-tab>
      <v-tab>
        <small>Change Password</small>
      </v-tab>
      <v-tab>
        <small>About Rak Buku</small>
      </v-tab>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <review-book :detail="detail" />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <change-password></change-password>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p>
              Rak Buku adalah website pengelolaan buku berbahasa Indonesia.
              <br />Sumber Buku yang tersedia di Rak Buku di tambahkan oleh Admin dan Member Rak Buku Setiap Hari nya
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import ChangePassword from "../user/ChangePassword";
import ReviewBook from "../user/ReviewBookContent";
export default {
  components: {
    ChangePassword,
    ReviewBook: ReviewBook
  },
  data() {
    return {
      detail: {
        url: "user-review?",
        isUser: 1
      }
    };
  }
};
</script>

<style>
</style>