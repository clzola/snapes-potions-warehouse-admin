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
            <v-form>
              <v-text-field dense outlined v-model="difficultyLevel.name"
                label="Name"
                :error-messages="errors.name">
              </v-text-field>
              <v-textarea dense outlined v-model="difficultyLevel.description"
                label="Description"
                :error-messages="errors.description">
              </v-textarea>
              <v-text-field dense outlined v-model="difficultyLevel.order"
                label="Order"
                :error-messages="errors.order">
              </v-text-field>
              <v-btn @click="save" color="primary">
                <v-icon left>mdi-content-save</v-icon>
                Save
              </v-btn>
            </v-form>
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
      difficultyLevel: {},
      errors: {
        name: null,
        description: null,
        order: null
      }
    }
  },
  mounted() {
    this.$store.commit('setToolbarTitle', 'Edit Potion Difficulty Level')

    this.$http.get(`/api/potion-difficulty-levels/${this.difficultyLevelId}`)
      .then(response => {
        this.difficultyLevel = response.data.data
      })
  },
  methods: {
    navigateBack() {
      this.$router.go(-1)
    },
    save() {
      let { name, description, order } = this.difficultyLevel
      this.$http
        .post(`/api/potion-difficulty-levels/${this.difficultyLevel.id}`, { name, description, order, _method: 'PUT' })
        .then(() => this.$router.go(-1))
    }
  }
}
</script>
