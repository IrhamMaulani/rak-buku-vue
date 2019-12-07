<template>
  <v-row class="ma-2">
    <v-col cols="12" md="4" lg="4" :class="{'px-0' : !$vuetify.breakpoint.smAndDown }">
      <div v-if="!isEdit">
        <v-card dark class="mr-2" height="590">
          <v-card-title class="pb-0"></v-card-title>
          <v-card-text class="text--primary mt-8 text-center">
            <v-avatar v-if="userProfile.image_profile !== null" size="180" class>
              <v-img
                :src="`${imageUrl}storage/${userProfile.image_profile.name}` "
                lazy-src="https://picsum.photos/id/11/10/6"
              />
            </v-avatar>
            <v-avatar v-else size="180" class>
              <v-img
                :src="require('../../assets/cover-book.jpg')"
                lazy-src="https://picsum.photos/id/11/10/6"
              />
            </v-avatar>
            <div class="white--text">
              <div class="divider mt-5"></div>
              <h1 class="mt-8">
                <v-tooltip left>
                  <template v-slot:activator="{ on }">
                    <v-icon v-on="on" class="mr-2 mb-1">check_circle</v-icon>
                  </template>
                  <span>Verified Writer</span>
                </v-tooltip>
                {{userProfile.full_name}}
              </h1>
              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <p v-on="on" class="mt-4 subtitle-1">{{userProfile.name}}</p>
                </template>
                <span>Your Username</span>
              </v-tooltip>
              <p class="body-2">
                <v-icon class="mr-2">email</v-icon>
                {{userProfile.email}}
              </p>
              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <p v-on="on" class="body-2">
                    <v-icon class="mr-2">event_seat</v-icon>
                    {{userProfile.reputation.name}}
                  </p>
                </template>
                <span>Reputation</span>
              </v-tooltip>

              <v-btn
                class="mt-12 mb-8"
                rounded
                large
                color="white black--text"
                @click="isEdit = true"
              >Edit Profile</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </div>
      <div v-else>
        <v-card dark class="mr-2" height="590">
          <v-card-title class="pb-0 mb-n4">
            <v-spacer></v-spacer>
            <v-btn class="mb-n2" @click="closeEdit" fab x-small>
              <v-icon>close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="text--primary mt-8 text-center">
            <image-input v-model="avatar">
              <div slot="activator">
                <v-avatar size="180" v-ripple v-if="!avatar" class="grey lighten-3">
                  <v-img
                    v-if="userProfile.image_profile !== null"
                    :src="`${imageUrl}storage/${userProfile.image_profile.name}`"
                    lazy-src="https://picsum.photos/id/11/10/6"
                  >
                    <v-icon color="white" size="33">camera_alt</v-icon>
                  </v-img>
                  <v-img
                    v-else
                    :src="require('../../assets/cover-book.jpg')"
                    lazy-src="https://picsum.photos/id/11/10/6"
                  >
                    <v-icon color="white" size="33">camera_alt</v-icon>
                  </v-img>
                </v-avatar>
                <v-avatar size="180" v-ripple v-else class="mb-3">
                  <img :src="avatar.imageURL" alt="avatar" />
                </v-avatar>
              </div>
            </image-input>
            <div class="white--text">
              <div class="divider mt-5"></div>
              <v-row class="justify-center align-center">
                <v-col cols="7" class="mb-n8">
                  <v-text-field label="Full Name" v-model="userProfile.full_name"></v-text-field>
                </v-col>
                <v-col cols="7" class="mb-n8">
                  <v-text-field label="User Name" v-model="userProfile.name"></v-text-field>
                </v-col>
                <v-col cols="7" class="mb-n6">
                  <v-text-field label="Email" v-model="userProfile.email"></v-text-field>
                </v-col>
              </v-row>
              <v-btn
                class="mt-12 mb-8"
                rounded
                large
                color="white black--text"
                @click="editProfile"
              >Save Profile</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </v-col>

    <v-col cols="12" md="8" lg="8" :class="{'px-0' : !$vuetify.breakpoint.smAndDown }">
      <v-card height="590">
        <v-card-title class="pb-0"></v-card-title>
        <v-card-text class="text--primary mt-8">
          <v-layout align-center justify-center>
            <div class="my-2">
              <v-btn text>My Book</v-btn>
            </div>
            <div class="my-2">
              <v-btn text>Wish List</v-btn>
            </div>
            <div class="my-2">
              <v-btn text>Favorite</v-btn>
            </div>
          </v-layout>
          <profile-book></profile-book>
        </v-card-text>
      </v-card>
    </v-col>
    <dialog-confirm :body="bodyDialog" v-on:confirmDialog="functionHelper"></dialog-confirm>
    <snack-bar :body="bodySnackBar"></snack-bar>
  </v-row>
</template>

<script>
import ProfileBookItem from "../user/ProfileBookItem";
import ImageInput from "../../components/ImageInput";
import DialogConfirm from "../../components/DialogConfirm";
import SnackBar from "../../components/SnackBar";
export default {
  components: {
    "profile-book": ProfileBookItem,
    ImageInput,
    SnackBar,
    DialogConfirm
  },
  created() {
    this.getData();
  },
  data() {
    return {
      imageUrl: "http://localhost/rak-buku-web/public/",
      bodyDialog: {
        dialog: false,
        message: "",
        title: "Alert!"
      },
      bodySnackBar: {
        timeout: 2000,
        message: "",
        snackbar: false
      },
      isEdit: false,
      avatar: null,
      saving: false,
      saved: false,
      isClosed: true,
      userProfile: {
        name: "",
        full_name: "",
        email: "",
        reputation: {
          name: ""
        },
        image_profile: null
      },
      bodyDialog: {
        dialog: false,
        message: "Added This Author?",
        title: "Add Author"
      },
      bodySnackBar: {
        timeout: 2000,
        message: "",
        snackbar: false
      }
    };
  },
  watch: {
    avatar: {
      handler: function() {
        this.saved = false;
      },
      deep: true
    }
  },
  methods: {
    uploadImage() {
      this.saving = true;
      setTimeout(() => this.savedAvatar(), 1000);
    },
    savedAvatar() {
      this.saving = false;
      this.saved = true;
    },
    editProfile() {
      this.isClosed = false;
      this.bodyDialog.dialog = true;
      this.bodyDialog.message = "Save Profile?";
    },
    closeEdit() {
      this.isClosed = true;
      this.bodyDialog.dialog = true;
      this.bodyDialog.message = "Are You Sure Want to Discard?";
    },
    functionHelper() {
      if (this.isClosed) {
        this.isEdit = false;
      } else {
        this.updateProfile();
        this.isEdit = false;
      }
    },
    getData() {
      this.$store.dispatch("setStatus", true);
      this.$http
        .get(`${this.$baseUrl}user/${this.userName}`)
        .then(result => {
          this.userProfile = result.data;
          this.$store.dispatch("setStatus", false);
        })
        .catch(error => {
          alert(error);
          this.$store.dispatch("setStatus", false);
        });
    },
    updateProfile() {
      const form = new FormData();
      const thisForm = this.userProfile;
      for (let key in thisForm) {
        form.append(key, thisForm[key]);
      }
      form.delete("image_profile");
      form.delete("reputation");
      if (this.avatar) {
        form.append("image_profile", this.avatar.imageFile);
      }

      form.append("_method", "PUT");

      this.$store.dispatch("setStatus", true);
      this.$http
        .post(`${this.$baseUrl}user/${this.userName}/edit`, form, {
          headers: { "content-type": "multipart/form-data" }
        })
        .then(response => {
          this.getData();
          window.$cookies.set("user_name", this.userProfile.name);
          this.$store.dispatch("setStatus", false);
          this.bodySnackBar.message = "Success!";
          this.bodySnackBar.snackbar = true;
        })
        .catch(error => {
          console.log(error);
          this.$store.dispatch("setStatus", false);
          this.bodySnackBar.message = "Failed!";
          this.bodySnackBar.snackbar = true;
        });
    }
  },
  computed: {
    userName() {
      return this.$store.getters.userName;
    }
  }
};
</script>

<style scoped>
.divider {
  width: 50%;
  height: 1px;
  margin-left: 25% !important;
  margin-right: 25% !important;
  font-weight: bold;
  background-color: white !important;
}
</style>