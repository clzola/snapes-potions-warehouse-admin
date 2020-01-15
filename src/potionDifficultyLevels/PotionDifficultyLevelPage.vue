<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-btn @click="navigateBack">
          <v-icon left>mdi-arrow-left</v-icon>
          Back
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="8" xl="4">
        <v-card>
          <v-card-text>
            <span class="font-weight-bold">ID:</span>
            <div class="mb-2">{{ difficultyLevel.id }}</div>
            <span class="font-weight-bold">Name:</span>
            <div class="mb-2">{{ difficultyLevel.name }}</div>
            <span class="font-weight-bold">Description:</span>
            <div class="mb-2">{{ difficultyLevel.description }}</div>
            <span class="font-weight-bold">Order:</span>
            <div class="mb-2">{{ difficultyLevel.order }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      difficultyLevelId: this.$route.params.id,
      difficultyLevel: {}
    }
  },
  mounted() {
    this.$store.commit('setToolbarTitle', 'Potion Difficulty Level')

    this.$http.get(`/api/potion-difficulty-levels/${this.difficultyLevelId}`)
      .then(response => {
        this.difficultyLevel = response.data.data
      })
  },
  methods: {
    navigateBack() {
      this.$router.go(-1)
    }
  }
}
</script>
