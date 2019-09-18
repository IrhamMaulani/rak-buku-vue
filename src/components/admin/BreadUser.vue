<template>
  <v-container>
    <data-user ref="dataUser" v-on:editItem="editItem($event)" v-on:deleteItem="deleteItem($event)"></data-user>
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
            :rules="[() => rules.atLeastOneItem(user.roles)]"
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

    <!-- <v-btn @click="openModal" color="primary" dark>Open Dialog</v-btn> -->
    <add-button v-on:openComponent="addData"></add-button>
    <snack-bar :body="bodySnackBar"></snack-bar>
    <dialog-confirm :body="bodyDialog" v-on:confirmDialog="confirmDialogDelete"></dialog-confirm>
    <dialog-loader :progress="progress" ref="dialogLoader"></dialog-loader>
  </v-container>
</template>

<script>
import AddButton from "../AddButton.vue";
import DataUser from "./DataUser.vue";
import Modal from "../Modal.vue";
import SnackBar from "../SnackBar.vue";
import DialogConfirm from "../DialogConfirm.vue";
import DialogLoader from "../DialogLoader.vue";

export default {
  components: {
    DataUser,
    AddButton,
    modal: Modal,
    SnackBar,
    DialogConfirm,
    DialogLoader
  },
  created() {
    this.getReputationList();
    this.getRoleList();
  },
  computed: {},
  data() {
    return {
      show1: false,
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 20) || "Name must be less than 10 characters"
      ],
      passwordRules: {
        required: value => !!value || "Required.",
        min: v => (v && v.length) >= 8 || "Min 8 characters"
      },
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
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
      progress: false,
      rules: {
        atLeastOneItem: selected =>
          selected.length > 0 || "At least one item should be selected"
      }
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
        this.$refs.modal.dialog = false;
        this.saveData();
      }
    },
    saveData() {
      this.progress = true;
      if (this.isPost) {
        this.postUserData();
      } else {
        this.updateUserData();
      }
    },
    addData() {
      if (this.isPost == false) {
        this.reset();
      }
      this.openModal("Add Data");
      this.isPost = true;
    },
    editItem(item) {
      //TODO GET SINGLE DATA FOR ID
      this.user = Object.assign({}, item);

      this.openModal("Edit Data");
      this.isPost = false;
    },
    deleteItem(item) {
      this.isPost = false;
      this.bodyDialog.dialog = true;
      this.user = Object.assign({}, item);
    },
    confirmDialogDelete() {
      this.deleteUserData();
    },
    getSingleDataUser(itemId) {
      this.$http
        .get(this.$baseUrl + "admin/user/" + itemId)
        .then(result => {
          this.singleData = result.data.data;
        })
        .catch(error => {
          this.openSnackbar(true, error);
        });
    },
    getReputationList() {
      this.$http
        .get(this.$baseUrl + "admin/reputation")
        .then(result => {
          this.reputationList = result.data.data;
        })
        .catch(error => {
          this.openSnackbar(true, error);
        });
    },
    getRoleList() {
      this.$http
        .get(this.$baseUrl + "admin/role")
        .then(result => {
          this.rolesList = result.data.data;
        })
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
          // alert(" " + response.data);

          this.openSnackbar(true, response.data);

          this.reset();
          this.$refs.dataUser.getData();
          this.progress = false;
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
          // alert(" " + response.data);
          this.openSnackbar(true, response.data);

          // this.reset();
          this.$refs.dataUser.getData();
          this.progress = false;
        })
        .catch(error => {
          this.openSnackbar(true, error);
          this.progress = false;
        });
    },
    openSnackbar(isOpen, message) {
      this.bodySnackBar.snackbar = isOpen;
      this.bodySnackBar.message = message;
    }
  }
};
</script>

