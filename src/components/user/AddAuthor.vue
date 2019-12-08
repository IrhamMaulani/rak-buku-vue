<template>
  <v-card flat class="mt-12">
    <v-form ref="form" @submit.prevent="submit">
      <v-container fluid>
        <v-row>
          <v-col cols="6">
            <v-text-field v-model="form.name" label="Name" required></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="form.pen_name" label="Pen Name" required></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field v-model="form.birth_place" label="Birth Place" required></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="form.birth_date"
                  label="Birth Date"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="form.birth_date" @input="menu2 = false" show-current="false"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="4">
            <v-text-field v-model="form.residence_place" label="Residence Place" required></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field v-model="social_medias.twitter" label="Twitter Url" required></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field v-model="social_medias.facebook" label="FaceBook Url" required></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field v-model="social_medias.instagram" label="Instagram Url" required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-file-input
              type="file"
              id="file"
              ref="file"
              v-model="files"
              prepend-icon="mdi-camera"
              label="Upload Image Profile"
            ></v-file-input>
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
        message: "Added This Author?",
        title: "Add Author"
      },
      bodySnackBar: {
        timeout: 2000,
        message: "",
        snackbar: false
      },
      form: {
        name: "",
        pen_name: "",
        birth_place: "",
        birth_date: new Date().toISOString().substr(0, 10),
        residence_place: ""
      },
      social_medias: {
        twitter: "",
        facebook: "",
        instagram: ""
      },
      files: null,
      menu2: false,
      menu: false,
      modal: false
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
      const form = new FormData();
      const thisForm = this.form;
      for (let key in thisForm) {
        form.append(key, thisForm[key]);
      }
      const socialMedia = [
        `twitter>${this.social_medias.twitter}`,
        `facebook>${this.social_medias.facebook}`,
        `instagram>${this.social_medias.instagram}`
      ];

      form.append("social_medias", socialMedia);

      form.append("author_images", this.files);

      this.$store.dispatch("setStatus", true);
      this.$http
        .post(this.$baseUrl + "author", form, {
          headers: { "content-type": "multipart/form-data" }
        })
        .then(response => {
          this.$store.dispatch("setStatus", false);
          this.bodySnackBar.message = "Success Added Author!";
          this.bodySnackBar.snackbar = true;
          this.resetForm();
        })
        .catch(error => {
          this.$store.dispatch("setStatus", false);
          this.bodySnackBar.message = "Failed Add Author!";
          this.bodySnackBar.snackbar = true;
        });
    }
  }
};
</script>

<style>
</style>