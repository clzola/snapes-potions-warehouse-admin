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
      <v-col sm="6" xl="4">
        <v-card>
          <v-card-text>
            <span class="font-weight-bold">ID:</span>
            <div class="mb-2">{{ potionCategory.id }}</div>
            <span class="font-weight-bold">Name:</span>
            <div class="mb-2">{{ potionCategory.name }}</div>
            <span class="font-weight-bold">Description:</span>
            <div class="mb-2">{{ potionCategory.description }}</div>
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
      potionCategoryId: this.$route.params.id,
      potionCategory: {}
    }
  },
  mounted() {
    this.$store.commit('setToolbarTitle', 'Potion Category')

    this.$http.get(`/api/potion-categories/${this.potionCategoryId}`)
      .then(response => {
        this.potionCategory = response.data.data
      })
  },
  methods: {
    navigateBack() {
      this.$router.go(-1)
    }
  }
}
</script>
