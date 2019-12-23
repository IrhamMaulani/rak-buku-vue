<template>
  <v-container>
    <data-user
      ref="dataUser"
      v-on:editItem="editItem($event)"
      v-on:deleteItem="deleteItem($event)"
      v-on:ban="openBanDialog($event)"
    ></data-user>
    <modal ref="modal" v-on:saveData="validation($event)">
      <div slot="form-content">
        <v-form ref="form" v-model="valid">
          <v-text-field v-model="user.name" label="Name" :rules="nameRules" required></v-text-field>
          <v-text-field label="Email" v-model="user.email" :rules="emailRules" required></v-text-field>
          <v-text-field
            v-if="isPost"
            v-model="user.password"
            :append-icon="show1 ? 'visibility' : 'visibility_off'"
            :rules="[passwordRules.required,  passwordRules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>

          <v-select
            :items="reputationList"
            :rules="[v => !!v || 'Item is required']"
            label="Pick Reputation"
            item-text="name"
            item-value="id"
            v-model="user.reputation.id"
            required
          ></v-select>
          <v-select
            :items="rolesList"
            :rules="[() => roleRules.atLeastOneItem(user.roles)]"
            label="Pick Roles"
            item-text="name"
            item-value="id"
            multiple
            v-model="user.roles"
            return-object
            chips
            required
          ></v-select>
        </v-form>
      </div>
    </modal>
    <add-button v-on:openComponent="addData"></add-button>
    <snack-bar :body="bodySnackBar"></snack-bar>
    <dialog-confirm :body="bodyDialog" v-on:confirmDialog="deleteUserData"></dialog-confirm>
    <dialog-confirm :body="banDialog" v-on:confirmDialog="ban"></dialog-confirm>
    <dialog-progress :progress="progress"></dialog-progress>
  </v-container>
</template>

<script>
import AddButton from "../../AddButton.vue";
import DataUser from "./DataUser.vue";
import Modal from "../../Modal.vue";
import SnackBar from "../../SnackBar.vue";
import DialogConfirm from "../../DialogConfirm.vue";
import DialogProgress from "../../DialogProgress.vue";
import {
  nameRules,
  passwordRules,
  emailRules,
  roleRules
} from "../../FormRules.js";
export default {
  components: {
    DataUser,
    AddButton,
    modal: Modal,
    SnackBar,
    DialogConfirm,
    DialogProgress
  },
  created() {
    this.getRoleAndReputation();
  },
  computed: {},
  data() {
    return {
      show1: false,
      nameRules: nameRules,
      passwordRules: passwordRules,
      emailRules: emailRules,
      roleRules: roleRules,
      password: "",
      reputationList: [],
      rolesList: [],

      valid: true,
      user: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        reputation: {
          type: Object,
          id: "",
          name: ""
        },
        roles: []
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
      banDialog: {
        dialog: false,
        message: "",
        title: ""
      },
      progress: false,
      statusBan: null
    };
  },
  watch: {
    "user.password"() {
      //watch and push password to user object
      this.user.password_confirmation = this.user.password;
    }
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
      this.user = Object.assign({}, item);
      this.openModal("Edit Data");
      this.isPost = false;
    },
    deleteItem(item) {
      this.isPost = false;
      this.bodyDialog.dialog = true;
      this.user = Object.assign({}, item);
    },
    getRoleAndReputation() {
      this.$http
        .all([
          this.$http.get(this.$baseUrl + "admin/reputation"),
          this.$http.get(this.$baseUrl + "admin/role")
        ])
        .then(
          this.$http.spread((reputation, role) => {
            this.reputationList = reputation.data.data;
            this.rolesList = role.data.data;
          })
        )
        .catch(error => {
          this.openSnackbar(true, error);
        });
    },
    reset() {
      this.$refs.form.reset();
    },
    postUserData() {
      this.$http
        .post(this.$baseUrl + "admin/user", this.user)
        .then(response => {
          this.openSnackbar(true, response.data);
          this.reset();
          this.$refs.dataUser.getData();
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
        .put(`${this.$baseUrl}admin/user/${this.user.id}`, this.user)
        .then(response => {
          this.openSnackbar(true, response.data);
          this.reset();
          this.$refs.dataUser.getData();
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
        .delete(`${this.$baseUrl}admin/user/${this.user.id}`)
        .then(response => {
          this.openSnackbar(true, response.data);
          this.$refs.dataUser.getData();
          this.progress = false;
        })
        .catch(error => {
          this.openSnackbar(true, error);
          this.progress = false;
        });
    },
    openBanDialog(item) {
      if (item[0] === 1) {
        this.banDialog.message = "Ban This User?";
        this.banDialog.title = "Ban?";
      } else if (item[0] === 0) {
        this.banDialog.message = "Unban This User?";
        this.banDialog.title = "Unban?";
      }

      this.statusBan = item[0];

      this.user.id = item[1];

      this.banDialog.dialog = true;
    },
    ban() {
      this.$http
        .put(`${this.$baseUrl}admin/user/${this.user.id}/ban`, {
          statusBan: this.statusBan
        })
        .then(response => {
          this.openSnackbar(true, response.data);

          this.$refs.dataUser.getData();
          // this.progress = false;
          this.isBan = false;
        })
        .catch(error => {
          this.openSnackbar(true, error);
          this.isBan = false;
        });
    }
  }
};
</script>