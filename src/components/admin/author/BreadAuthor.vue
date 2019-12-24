<template>
  <v-container>
    <data-author
      ref="dataTag"
      v-on:editItem="editItem($event)"
      v-on:deleteItem="deleteItem($event)"
      v-on:ban="openBanDialog($event)"
    ></data-author>
    <modal ref="modal" v-on:saveData="validation($event)">
      <div slot="form-content">
        <v-form ref="form" v-model="valid">
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
                <v-date-picker
                  v-model="form.birth_date"
                  @input="menu2 = false"
                  show-current="false"
                ></v-date-picker>
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
import DataAuthor from "./DataAuthor.vue";
import Modal from "../../Modal.vue";
import SnackBar from "../../SnackBar.vue";
import DialogConfirm from "../../DialogConfirm.vue";
import DialogProgress from "../../DialogProgress.vue";
import { nameRules } from "../../FormRules.js";
export default {
  components: {
    DataAuthor,
    AddButton,
    modal: Modal,
    SnackBar,
    DialogConfirm,
    DialogProgress
  },
  computed: {},
  data() {
    return {
      show1: false,
      nameRules: nameRules,
      password: "",
      reputationList: [],
      rolesList: [],
      valid: true,
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
      modal: false,
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

      progress: false
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

      let socialMedias = this.form.social_medias;

      if (socialMedias.length > 0) {
        if (socialMedias[0] !== null) {
          this.social_medias.twitter = socialMedias[0].pivot.url;
        }
        if (socialMedias[1] !== null) {
          this.social_medias.facebook = socialMedias[1].pivot.url;
        }
        if (socialMedias[2] !== null) {
          this.social_medias.instagram = socialMedias[2].pivot.url;
        }
      } else {
        this.social_medias.twitter = "";
        this.social_medias.facebook = "";
        this.social_medias.instagram = "";
      }

      this.openModal("Edit Data");
      this.isPost = false;
    },
    deleteItem(item) {
      this.isPost = false;
      this.bodyDialog.dialog = true;
      this.publisher = Object.assign({}, item);
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
          headers: { "content-type": "application/x-www-form-urlencoded" }
        })
        .then(response => {
          this.openSnackbar(true, response.data);
          this.reset();
          this.$refs.dataTag.getData();
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

      const socialMedia = [
        `twitter>${this.social_medias.twitter}`,
        `facebook>${this.social_medias.facebook}`,
        `instagram>${this.social_medias.instagram}`
      ];

      form.append("social_medias", socialMedia);

      form.append("author_images", this.files);
      form.append("_method", "PUT");

      this.$store.dispatch("setStatus", true);
      this.$http
        .post(this.$baseUrl + "admin/author/" + this.form.id, form, {
          headers: { "content-type": "application/x-www-form-urlencoded" }
        })
        .then(response => {
          this.openSnackbar(true, response.data);
          this.reset();
          this.$refs.dataTag.getData();
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
        .delete(`${this.$baseUrl}admin/publisher/${this.publisher.id}`)
        .then(response => {
          this.openSnackbar(true, response.data);
          this.$refs.dataTag.getData();
          this.progress = false;
        })
        .catch(error => {
          this.openSnackbar(true, error);
          this.progress = false;
        });
    }
  }
};
</script>