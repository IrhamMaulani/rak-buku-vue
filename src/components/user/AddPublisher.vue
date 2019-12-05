<template>
  <v-card flat class="mt-12">
    <v-form ref="form" @submit.prevent="submit">
      <v-container fluid>
        <v-row>
          <v-col cols="6">
            <v-text-field v-model="form.name" label="Publisher Name" required></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="form.address" label="Publisher Address" required></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="form.country" label="Publisher Country" required></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="form.city" label="Publisher City" required></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-btn text @click="resetForm">Clear Form</v-btn>
        <v-spacer></v-spacer>
        <v-btn :disabled="!formIsValid" text color="primary" type="submit">Register</v-btn>
      </v-card-actions>
    </v-form>
    <snack-bar :body="bodySnackBar"></snack-bar>
    <dialog-confirm :body="bodyDialog" v-on:confirmDialog="postData"></dialog-confirm>
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
      bodyDialog: {
        dialog: false,
        message: "Added This Publisher?",
        title: "Add Publisher"
      },
      bodySnackBar: {
        timeout: 2000,
        message: "",
        snackbar: false
      },
      form: {
        name: "",
        address: "",
        country: "",
        city: ""
      }
    };
  },
  computed: {
    formIsValid() {
      return this.form.name;
    }
  },
  methods: {
    resetForm() {
      this.form = Object.assign({}, this.form);
      this.$refs.form.reset();
    },
    submit() {
      this.bodyDialog.dialog = true;
    },
    postData() {
      this.$store.dispatch("setStatus", true);
      this.$http
        .post(this.$baseUrl + "publisher", this.form)
        .then(response => {
          this.$store.dispatch("setStatus", false);
          this.bodySnackBar.message = "Success Added Publisher!";
          this.bodySnackBar.snackbar = true;
          this.resetForm();
        })
        .catch(error => {
          this.$store.dispatch("setStatus", false);
          this.bodySnackBar.message = "Failed Add Publisher!";
          this.bodySnackBar.snackbar = true;
        });
    }
  }
};
</script>

<style>
</style>