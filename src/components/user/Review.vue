<template>
  <div>
    <v-card class="mb-4" v-for="n in 6" :key="n">
      <v-row>
        <v-col
          cols="1"
          class="ml-12 mt-4 text-center pr-0"
          :class="{'mr-8' : $vuetify.breakpoint.smAndDown }"
        >
          <v-avatar size="40" class="ma-0">
            <v-img
              :src="require('../../assets/profile.png')"
              lazy-src="https://picsum.photos/id/11/10/6"
              class="ma-0"
            />
          </v-avatar>
        </v-col>
        <v-col cols="8" class="mt-4 pl-0">
          <router-link :to="url">
            <p
              class="title ma-0"
            >Harry Potter And Fucking Wizard IS Fucking Suck lmao what a gay books</p>
          </router-link>
        </v-col>
      </v-row>
      <v-row justify="center" class="mt-n6">
        <v-col cols="1" :class="{'mr-12' : $vuetify.breakpoint.smAndDown }"></v-col>
        <v-col cols="10" class="ml-n8">
          <span class="mr-6">
            <router-link :to="url">31, Oktober 1997</router-link>
          </span>
          <span class="underline">
            <router-link :to="url">Irham Maulani</router-link>
          </span>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" class="px-10 text-left">
          <p class="mx-12">
            Alright. So... I sat down and plowed through Umineko again recently. I guess I'll go ahead and give it the same treatment I gave Higurashi. In case you didn't read said review, THERE MIGHT BE SPOILERS.
            ...well...not so much this time. I can't go in-depth into the characters without revealing information important to the development of the overall plot (something I didn't have to really worry about with Higurashi), so there isn't going to be as much analysis.
            REVIEW TIME!
            ===Introduction===
            Umineko no Naku Koro ni (lit. "When the Seagulls Cry") is a series of eight sound novels released over a period spanning from August 2007 to December 2010. It has a couple of spin-offs (although nowhere near as many as Higurashi), an anime, a manga, and all the other miscellaneous mediums that come with a successful franchise. Like its predecessor, Umineko earned quite the reputation for its excellent plot... and abhorrent art.
            ===Background===
            Umineko takes place on an island called Rokkenjima in 1986, and focuses upon a series of
            gruesome murder mysteries involving the wealthy Ushiromiya family.....
          </p>
        </v-col>

        <p class="ml-auto mr-12">
          <router-link :to="url">Read More</router-link>
        </p>
      </v-row>
      <v-row justify="center" class="mt-n8">
        <v-col cols="1"></v-col>
        <v-col cols="11" class="mb-4 ml-12 d-flex flex-row justify-start">
          <span class="mr-12">
            <v-icon class="mr-4">thumb_up</v-icon>
            <span>2000000</span>
          </span>

          <span class="mr-12">
            <v-icon class="mr-4">thumb_down</v-icon>
            <span>2000000</span>
          </span>

          <span class="mr-12">
            <v-icon class="mr-4">mode_comment</v-icon>
            <span>
              <router-link :to="url">100 Comments</router-link>
            </span>
          </span>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: "/reviews/1"
    };
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: black !important;
}
a:hover {
  text-decoration: underline;
}
.underline {
  text-decoration: underline;
}
</style>