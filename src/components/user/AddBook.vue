<template>
  <v-card flat class="mt-12">
    <v-snackbar v-model="snackbar" absolute top right color="success">
      <span>Registration successful!</span>
      <v-icon dark>mdi-checkbox-marked-circle</v-icon>
    </v-snackbar>
    <v-form ref="form" @submit.prevent="submit">
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="form.title" :rules="rules.name" label="Title" required></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="form.title" :rules="rules.name" label="Volume" required></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-combobox v-model="select" :items="items" label="Add Tags" multiple></v-combobox>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="form.title" :rules="rules.name" label="Tahun Terbit" required></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="form.title" :rules="rules.name" label="Origin Language" required></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-combobox v-model="select" :items="items" label="Add Author" multiple></v-combobox>
          </v-col>
          <v-col cols="6">
            <v-combobox v-model="select" :items="items" label="Add Publisher" multiple></v-combobox>
          </v-col>
          <v-col cols="6" class="mt-n8">
            <small>
              Can't Find The Author? Add
              <router-link :to="'add-author'">Here</router-link>
            </small>
          </v-col>
          <v-col cols="6" class="mt-n8">
            <small>
              Can't Find The Publisher? Add
              <router-link :to="'add-publisher'">Here</router-link>
            </small>
          </v-col>
          <v-col cols="12">
            <v-textarea v-model="form.bio" color="teal">
              <template v-slot:label>
                <div>Description</div>
              </template>
            </v-textarea>
          </v-col>
          <v-col cols="12">
            <v-file-input
              :rules="rules"
              accept="image/png, image/jpeg, image/bmp"
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
    <v-dialog v-model="terms" width="70%">
      <v-card>
        <v-card-title class="title">Terms</v-card-title>
        <v-card-text v-for="n in 5" :key="n">{{ content }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="purple" @click="terms = false">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="conditions" width="70%">
      <v-card>
        <v-card-title class="title">Conditions</v-card-title>
        <v-card-text v-for="n in 5" :key="n">{{ content }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="purple" @click="conditions = false">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  data() {
    const defaultForm = Object.freeze({
      title: "",
      bio: "",
      favoriteAnimal: "",
      age: null,
      terms: false
    });

    return {
      form: Object.assign({}, defaultForm),
      rules: {
        age: [val => val < 10 || `I don't believe you!`],
        animal: [val => (val || "").length > 0 || "This field is required"],
        name: [val => (val || "").length > 0 || "This field is required"]
      },
      animals: ["Dog", "Cat", "Rabbit", "Turtle", "Snake"],
      conditions: false,
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.`,
      snackbar: false,
      terms: false,
      defaultForm,
      items: ["Programming", "Design", "Vue", "Vuetify"]
    };
  },

  computed: {
    formIsValid() {
      return (
        this.form.first &&
        this.form.last &&
        this.form.favoriteAnimal &&
        this.form.terms
      );
    }
  },

  methods: {
    resetForm() {
      this.form = Object.assign({}, this.defaultForm);
      this.$refs.form.reset();
    },
    submit() {
      this.snackbar = true;
      this.resetForm();
    }
  }
};
</script>

<style>
</style>