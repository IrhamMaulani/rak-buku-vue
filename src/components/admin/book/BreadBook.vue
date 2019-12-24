<template>
  <v-container>
    <data-book
      ref="dataBook"
      v-on:editItem="editItem($event)"
      v-on:deleteItem="deleteItem($event)"
      v-on:ban="openBanDialog($event)"
    ></data-book>
    <modal ref="modal" v-on:saveData="validation($event)">
      <div slot="form-content">
        <v-form ref="form" v-model="valid">
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
                return-object
                autocomplete="new-password"
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
        </v-form>
      </div>
    </modal>
    <add-button v-on:openComponent="addData"></add-button>
    <snack-bar :body="bodySnackBar"></snack-bar>
    <dialog-confirm :body="bodyDialog" v-on:confirmDialog="deleteUserData"></dialog-confirm>
    <dialog-progress :progress="progress"></dialog-progress>
  </v-container>
</template>

<script>
import AddButton from "../../AddButton.vue";
import DataBook from "./DataBook.vue";
import Modal from "../../Modal.vue";
import SnackBar from "../../SnackBar.vue";
import DialogConfirm from "../../DialogConfirm.vue";
import DialogProgress from "../../DialogProgress.vue";
import { nameRules } from "../../FormRules.js";
export default {
  components: {
    DataBook,
    AddButton,
    modal: Modal,
    SnackBar,
    DialogConfirm,
    DialogProgress
  },
  computed: {},
  created() {
    this.getTagAuthorPublisher();
  },
  data() {
    return {
      show1: false,
      nameRules: nameRules,
      password: "",
      reputationList: [],
      rolesList: [],
      valid: true,
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
      files: null,
      isPost: null,
      bodySnackBar: {
        timeout: 2000,
        message: "",
        snackbar: false
      },
      bodyDialog: {
        dialog: false,
        message: "Are You Sure Want To Delete This Item?",
        title: "Delete Item"
      },

      progress: false,
      tags: [],
      authors: [],
      publishers: []
    };
  },
  methods: {
    openModal(message) {
      this.$refs.modal.open(message);
    },
    validation() {
      if (this.$refs.form.validate()) {
        this.progress = true;
        if (this.isPost) {
          this.postUserData();
        } else {
          this.updateUserData();
        }
      }
    },
    openSnackbar(isOpen, message) {
      this.bodySnackBar.snackbar = isOpen;
      this.bodySnackBar.message = message;
    },
    addData() {
      if (this.isPost == false) {
        this.reset();
      }
      this.openModal("Add Data");
      this.isPost = true;
    },
    editItem(item) {
      this.form = Object.assign({}, item);

      this.openModal("Edit Data");
      this.isPost = false;
    },
    deleteItem(item) {
      this.isPost = false;
      this.bodyDialog.dialog = true;
      this.form = Object.assign({}, item);
    },
    reset() {
      this.$refs.form.reset();
    },
    postUserData() {
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
          this.openSnackbar(true, response.data);
          this.reset();
          this.$refs.dataBook.getData();
          this.progress = false;
          this.$refs.modal.dialog = false;
        })
        .catch(error => {
          this.openSnackbar(true, error);
          this.progress = false;
        });
    },
    updateUserData() {
      const form = new FormData();
      const thisForm = this.form;
      for (let key in thisForm) {
        form.append(key, thisForm[key]);
      }

      form.append("book_images", this.files);
      form.append("_method", "PUT");

      form.append("tags_json", JSON.stringify(this.form.tags));
      form.append("authors_json", JSON.stringify(this.form.authors));

      this.$store.dispatch("setStatus", true);
      this.$http
        .post(this.$baseUrl + "admin/book/" + this.form.id, form, {
          headers: { "content-type": "application/x-www-form-urlencoded" }
        })
        .then(response => {
          this.openSnackbar(true, response.data);
          this.reset();
          this.$refs.dataBook.getData();
          this.progress = false;
          this.$refs.modal.dialog = false;
        })
        .catch(error => {
          this.openSnackbar(true, error);
          this.progress = false;
        });
    },
    deleteUserData() {
      this.progress = true;
      this.$http
        .delete(`${this.$baseUrl}admin/book/${this.form.id}`)
        .then(response => {
          this.openSnackbar(true, response.data);
          this.$refs.dataBook.getData();
          this.progress = false;
        })
        .catch(error => {
          this.openSnackbar(true, error);
          this.progress = false;
        });
    },
    getTagAuthorPublisher() {
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
    }
  }
};
</script>