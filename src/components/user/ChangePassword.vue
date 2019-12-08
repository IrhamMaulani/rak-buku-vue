<template>
  <v-card flat class="mt-n10">
    <v-form ref="form" @submit.prevent="submit">
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-text-field type="password" v-model="form.old_password" label="Old Password" required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field type="password" v-model="form.password" label="New Password" required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              type="password"
              v-model="form.confirm_password"
              label="Confirm Password"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="!formIsValid" text color="primary" type="submit">Register</v-btn>
      </v-card-actions>
    </v-form>
    <snack-bar :body="bodySnackBar"></snack-bar>
    <dialog-confirm :body="bodyDialog" v-on:confirmDialog="changePassword"></dialog-confirm>
  </v-card>
</template>

<script>
import SnackBar from "../../components/SnackBar";
import DialogConfirm from "../../components/DialogConfirm";

export default {
  components: {
    SnackBar,
    DialogConfirm
  },
  data() {
    return {
      form: {
        old_password: "",
        password: "",
        confirm_password: ""
      },
      bodyDialog: {
        dialog: false,
        message: "Do You Want to Change Password?",
        title: "Change Password"
      },
      bodySnackBar: {
        timeout: 2000,
        message: "",
        snackbar: false
      }
    };
  },
  methods: {
    submit() {
      // this.postData();
      this.bodyDialog.dialog = true;
      // this.resetForm();
    },
    resetForm() {
      this.form = Object.assign({}, this.form);
      this.$refs.form.reset();
    },
    changePassword() {
      this.$store.dispatch("setStatus", true);
      this.$http
        .post(this.$baseUrl + "change-password", this.form)
        .then(response => {
          this.$store.dispatch("setStatus", false);
          this.bodySnackBar.message = "Success Change Password!";
          this.bodySnackBar.snackbar = true;
          this.resetForm();
        })
        .catch(error => {
          this.$store.dispatch("setStatus", false);
          this.bodySnackBar.message = "Failed Change Password!";
          this.bodySnackBar.snackbar = true;
        });
    }
  },
  computed: {
    formIsValid() {
      return (
        this.form.old_password &&
        this.form.password &&
        this.form.confirm_password &&
        this.form.password === this.form.confirm_password
      );
    }
  }
};
</script>

<style>
</style>