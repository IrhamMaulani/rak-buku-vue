<template>
  <v-container>
    <data-tag
      ref="dataTag"
      v-on:editItem="editItem($event)"
      v-on:deleteItem="deleteItem($event)"
      v-on:ban="openBanDialog($event)"
    ></data-tag>
    <modal ref="modal" v-on:saveData="validation($event)">
      <div slot="form-content">
        <v-form ref="form" v-model="valid">
          <v-text-field v-model="tag.name" label="Tag Name" :rules="nameRules" required></v-text-field>
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
import DataTag from "./DataTag.vue";
import Modal from "../../Modal.vue";
import SnackBar from "../../SnackBar.vue";
import DialogConfirm from "../../DialogConfirm.vue";
import DialogProgress from "../../DialogProgress.vue";
import { nameRules } from "../../FormRules.js";
export default {
  components: {
    DataTag,
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
      tag: {
        id: "",
        name: ""
      },
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
      this.tag = Object.assign({}, item);
      this.openModal("Edit Data");
      this.isPost = false;
    },
    deleteItem(item) {
      this.isPost = false;
      this.bodyDialog.dialog = true;
      this.tag = Object.assign({}, item);
    },
    reset() {
      this.$refs.form.reset();
    },
    postUserData() {
      this.$http
        .post(this.$baseUrl + "admin/tag", this.tag)
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
      this.$http
        .put(`${this.$baseUrl}admin/tag/${this.tag.id}`, this.tag)
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
        .delete(`${this.$baseUrl}admin/tag/${this.tag.id}`)
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