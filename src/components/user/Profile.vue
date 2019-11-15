<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xs12 lg8 md10>
        <v-row class="ma-2">
          <v-col cols="12" md="4" lg="4" :class="{'px-0' : !$vuetify.breakpoint.smAndDown }">
            <v-card dark class="mr-2">
              <v-card-title class="pb-0"></v-card-title>
              <v-card-text class="text--primary mt-8 text-center">
                <v-avatar size="180">
                  <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
                </v-avatar>
                <div class="white--text">
                  <div class="divider mt-5"></div>

                  <h1 class="mt-8">
                    <v-tooltip left>
                      <template v-slot:activator="{ on }">
                        <v-icon v-on="on" class="mr-2 mb-1">check_circle</v-icon>
                      </template>
                      <span>Verified Writer</span>
                    </v-tooltip>Irham Maulani
                  </h1>
                  <v-tooltip left>
                    <template v-slot:activator="{ on }">
                      <p v-on="on" class="mt-4 subtitle-1">IrhamMaulani</p>
                    </template>
                    <span>Your Username</span>
                  </v-tooltip>
                  <p class="body-2">
                    <v-icon class="mr-2">email</v-icon>irhammaulani@gmail.com
                  </p>
                  <v-tooltip left>
                    <template v-slot:activator="{ on }">
                      <p v-on="on" class="body-2">
                        <v-icon class="mr-2">event_seat</v-icon>Fire Keeper
                      </p>
                    </template>
                    <span>Reputation</span>
                  </v-tooltip>

                  <v-btn class="mt-12 mb-8" rounded large color="white black--text">Edit Profile</v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="8" lg="8" :class="{'px-0' : !$vuetify.breakpoint.smAndDown }">
            <v-card>
              <v-card-title class="pb-0">Popular Review</v-card-title>
              <v-card-text class="text--primary mt-8"></v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {};
</script>

<style scoped>
.cream {
  background-color: #acbed8;
  font-weight: bold;
}
.divider {
  width: 50%;
  height: 1px;
  margin-left: 25% !important;
  margin-right: 25% !important;
  font-weight: bold;
  background-color: white !important;
}
</style>