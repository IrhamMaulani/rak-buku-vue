<template>
  <v-card flat>
    <v-toolbar flat>
      <v-toolbar-title>Setting</v-toolbar-title>
    </v-toolbar>
    <v-tabs vertical>
      <v-tab class="ml-n1">
        <small>Your Report</small>
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
            <p>Sed aliquam ultrices mauris. Donec posuere vulputate arcu. Morbi ac felis. Etiam feugiat lorem non metus. Sed a libero.</p>

            <p>Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel, lacus. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Aliquam lobortis. Aliquam lobortis. Suspendisse non nisl sit amet velit hendrerit rutrum.</p>

            <p
              class="mb-0"
            >Phasellus dolor. Fusce neque. Fusce fermentum odio nec arcu. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Phasellus blandit leo ut odio.</p>
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
              <br>Sumber Buku yang tersedia di Rak Buku di tambahkan oleh Admin dan Member Rak Buku Setiap Hari nya
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import ChangePassword from "../user/ChangePassword";
export default {
  components: {
    ChangePassword
  }
};
</script>

<style>
</style>