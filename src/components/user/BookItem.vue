<template>
  <v-row class="mt-6">
    <v-col cols="12" md="7" lg="7">
      <v-img
        :src="require('../../assets/cover-book.jpg')"
        lazy-src="https://picsum.photos/id/11/10/6"
        height="825"
      />
    </v-col>

    <v-col cols="12" md="5" lg="5" class>
      <v-row class="white mt-12">
        <v-col cols="6" class="border border-right text-center">
          <p class="display-3 font-weight-black">69</p>
        </v-col>
        <v-col cols="6" class="border border-right">
          <p class="subtitle-1">
            <router-link :to="url">Romance</router-link>,
            <router-link :to="url">Manga</router-link>,
            <router-link :to="url">Fucking Weaboo</router-link>
          </p>
        </v-col>
      </v-row>
      <p class="display-2 font-weight-bold mt-12">The Lord Of The Rings The Return Of The King</p>

      <v-row class="white mt-12">
        <v-col cols="6" class>
          <p>Volume 1</p>
          <p>Pengarang : J.K Dunkey</p>
          <p>Publisher : Hogwart Lmao</p>
          <p>Tahun Terbit : 2021</p>
          <p>Origin Langauge : Zimbabwe</p>
          <p class="title">IS OWNED</p>

          <v-select :items="statuses" item-text="name" item-value="id" label="Wish List"></v-select>
          <v-select :items="scores" item-text="id" item-value="id" label="Your Scores"></v-select>
        </v-col>
        <v-col cols="6" class>
          <p class="body-2">
            Eighth story arc of JoJo no Kimyou na Bouken series.
            Following the Great East Japan earthquake,
            Morioh has been stricken by vast earthen protrusions known by the locals as Wall Eyes. Despite investigation,
            professional estimations are left empty. Meanwhile, the young girl Yasuho Hirose discovers a man buried within the ground,
            he possesses a distinctive star-shaped birthmark together with deeply penetrating bite marks. The man, who has contracted
            a staple case of amnesia is taken in by a local family and given the name Jousuke Higashikata,
            however mysterious events cannot stop from piling one upon the other and soon that enigma known as stand emerges to
          </p>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" md="12" lg="12">
      <h1>Reviews</h1>
      <div class="d-flex justify-end">
        <v-icon class="mr-1 mb-4">create</v-icon>
        <router-link :to="reviewUrl">
          <p class="mr-5">Write Review</p>
        </router-link>
        <router-link :to="reviewUrl">
          <p>More Reviews</p>
        </router-link>
      </div>
      <v-divider class="mb-6"></v-divider>
      <review />
    </v-col>
  </v-row>
</template>

<script>
import Review from "../user/Review";
export default {
  components: {
    review: Review
  },
  data() {
    return {
      url: "",
      reviewUrl: "1/reviews",
      statuses: [
        { id: 1, name: "Wish List" },
        { id: 2, name: "On Hold" },
        { id: 3, name: "Dropped" },
        { id: 4, name: "Completed" },
        { id: 5, name: "Re-reading" }
      ],
      scores: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 },
        { id: 10 }
      ]
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
.border {
  border-bottom: 2px solid rgba(0, 0, 0, 0.363) !important;
  /* border-right: 2px solid rgba(0, 0, 0, 0.363) !important; */
  border-radius: 0px !important;
}
.border-right:first-child {
  border-right: 2px solid rgba(0, 0, 0, 0.363) !important;
  border-radius: 0px !important;
}
</style>