<template>
  <v-card flat class="mt-12">
    <v-form ref="form" @submit.prevent="submit">
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="form.title" label="Title" required></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field v-model="form.volume" label="Volume" required></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field v-model="form.edition" label="Edition" required></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-autocomplete
              v-model="form.tags"
              :items="tags"
              item-text="name"
              item-value="id"
              dense
              label="Add Tags"
              multiple
              autocomplete="new-password"
              return-object
            ></v-autocomplete>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="form.print_year" label="Tahun Terbit" required></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="form.origin_language" label="Origin Language" required></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-autocomplete
              v-model="form.authors"
              :items="authors"
              item-text="name"
              item-value="id"
              dense
              label="Add Authors"
              multiple
              autocomplete="new-password"
              return-object
            ></v-autocomplete>
          </v-col>
          <v-col cols="6">
            <v-autocomplete
              v-model="form.publisher_id"
              :items="publishers"
              item-text="name"
              item-value="id"
              dense
              label="Add Publisher"
              autocomplete="new-password"
            ></v-autocomplete>
          </v-col>
          <v-col cols="6" class="mt-n8">
            <small>
              Can't Find The Author? Add
              <router-link :to="'add-author'" target="_blank">Here</router-link>
            </small>
          </v-col>
          <v-col cols="6" class="mt-n8">
            <small>
              Can't Find The Publisher? Add
              <router-link :to="'add-publisher'" target="_blank">Here</router-link>
            </small>
          </v-col>
          <v-col cols="12">
            <v-textarea v-model="form.description" color="teal">
              <template v-slot:label>
                <div>Description</div>
              </template>
            </v-textarea>
          </v-col>
          <v-col cols="12">
            <v-file-input
              type="file"
              id="file"
              ref="file"
              v-model="files"
              v-on:change="handleFileUpload()"
              prepend-icon="mdi-camera"
              label="Upload Cover"
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
        message: "Added This Book?",
        title: "Add Book"
      },
      bodySnackBar: {
        timeout: 2000,
        message: "",
        snackbar: false
      },
      form: {
        title: "",
        volume: "",
        edition: "",
        description: "",
        print_year: "",
        origin_language: "",
        publisher_id: "",
        tags: "",
        authors: ""
      },
      tags: [],
      authors: [],
      publishers: [],
      files: null,
      rules: [
        value =>
          !value ||
          value.size < 2000000 ||
          "Avatar size should be less than 2 MB!"
      ]
    };
  },

  computed: {
    formIsValid() {
      return (
        this.form.title &&
        this.form.volume &&
        this.form.description &&
        this.form.edition &&
        this.form.print_year &&
        this.form.origin_language &&
        this.form.publisher_id &&
        this.files &&
        this.form.tags &&
        this.form.authors
      );
    }
  },
  created() {
    this.getData();
  },

  methods: {
    resetForm() {
      this.form = Object.assign({}, this.form);
      this.$refs.form.reset();
    },
    submit() {
      // this.postData();
      this.bodyDialog.dialog = true;
      // this.resetForm();
    },
    getData() {
      this.$store.dispatch("setStatus", true);
      this.$http
        .all([
          this.$http.get(`${this.$baseUrl}tag`),
          this.$http.get(`${this.$baseUrl}author`),
          this.$http.get(`${this.$baseUrl}publisher`)
        ])
        .then(
          this.$http.spread((tags, authors, publishers) => {
            this.tags = tags.data;
            this.authors = authors.data;
            this.publishers = publishers.data;
            this.$store.dispatch("setStatus", false);
          })
        )
        .catch(error => {
          alert("error");
        });
    },
    postData() {
      const form = new FormData();
      const thisForm = this.form;
      for (let key in thisForm) {
        form.append(key, thisForm[key]);
      }

      form.append("book_images", this.files);
      form.append("tags_json", JSON.stringify(this.form.tags));
      form.append("authors_json", JSON.stringify(this.form.authors));

      this.$store.dispatch("setStatus", true);
      this.$http
        .post(this.$baseUrl + "book", form, {
          headers: { "content-type": "application/x-www-form-urlencoded" }
        })
        .then(response => {
          this.$store.dispatch("setStatus", false);
          this.bodySnackBar.message = "Success Added Book!";
          this.bodySnackBar.snackbar = true;
          this.resetForm();
        })
        .catch(error => {
          this.$store.dispatch("setStatus", false);
          this.bodySnackBar.message = "Failed Add Book!";
          this.bodySnackBar.snackbar = true;
        });
    },
    handleFileUpload() {}
  }
};
</script>

<style>
</style>