<template>
  <v-dialog v-model="dialog" persistent fullscreen transition="dialog-bottom-transition">
    <template v-slot:activator="{ on }">
      <!-- <v-btn color="primary" dark @click="dialog = true">Open Dialog</v-btn> -->
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{title}}</v-toolbar-title>
        <div class="flex-grow-1"></div>
        <v-toolbar-items>
          <v-btn dark text v-on:click="saveData">Save</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container>
        <v-list three-line subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>
                <slot name="form-content"></slot>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      notifications: false,
      sound: true,
      widgets: false,
      on: false,
      dialog: false,
      title: "Modal Title"
    };
  },
  methods: {
    open(message) {
      // console.log(this.$props.form);
      this.dialog = true;
      this.title = message;
    },
    saveData() {
      this.$emit("saveData");
    }
  }
};
</script>