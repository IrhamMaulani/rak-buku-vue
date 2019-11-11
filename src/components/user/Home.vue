<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" lg="8">
        <v-card>
          <v-card-title>Latest Update</v-card-title>
          <v-card-text class="text--primary mt-8">
            <main-item></main-item>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4" lg="4" class="px-0">
        <div :class="{'fixed' : !$vuetify.breakpoint.smAndDown }">
          <v-row>
            <v-col cols="12" class="py-0 mb-4">
              <v-card>
                <v-card-title>Popular Books</v-card-title>
                <v-card-text class="text--primary mt-8">
                  <div>Whitehaven Beach</div>

                  <div>Whitsunday Island, Whitsunday Islands</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="py-0 mb-1">
              <v-card class>
                <v-card-title>Popular Review</v-card-title>
                <v-card-text class="text--primary mt-8">
                  <div>Whitehaven Beach</div>
                  <div>Whitsunday Island, Whitsunday Islands</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" class="py-0">
              <v-card>
                <user-footer></user-footer>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Footer from "../user/Footer.vue";
import MainBookItem from "../user/MainBookItem";
export default {
  components: {
    "user-footer": Footer,
    "main-item": MainBookItem
  }
};
</script>

<style scoped>
.fixed {
  position: sticky;
  top: 0;
}
</style>