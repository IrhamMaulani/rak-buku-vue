<template>
  <div>
    <v-row class="pa-0">
      <!-- NOTE IF large 6 item md 9 -->
      <v-col
        cols="4"
        v-for="n in 6"
        :key="n"
        class="ma-0"
        :class="{'mt-12' : $vuetify.breakpoint.lgOnly, 'mt-10' : $vuetify.breakpoint.mdOnly }"
      >
        <v-hover v-slot:default="{ hover }">
          <v-card color="grey lighten-4" max-width="212" class="mx-auto mt-n2">
            <v-img :aspect-ratio="1/1" src="https://cdn.vuetifyjs.com/images/cards/kitchen.png">
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="d-flex transition-fast-in-fast-out blue-grey darken-4 v-card--reveal display-3 white--text"
                  style="height: 100%;"
                >$14.99</div>
              </v-expand-transition>
            </v-img>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>