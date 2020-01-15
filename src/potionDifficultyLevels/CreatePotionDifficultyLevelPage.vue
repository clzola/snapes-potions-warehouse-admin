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
            <v-form ref="form">
              <v-text-field dense outlined v-model="name"
                label="Name"
                :error-messages="errors.name">
              </v-text-field>
              <v-textarea dense outlined v-model="description"
                label="Description"
                :error-messages="errors.description">
              </v-textarea>
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
      name: null,
      description: null,
      errors: {
        name: null,
        description: null
      }
    }
  },
  mounted() {
    this.$store.commit('setToolbarTitle', 'Add New Potion Difficulty Level')
  },
  methods: {
    navigateBack() {
      this.$router.go(-1)
    },
    save() {
      this.resetErrorMessages()
      let { name, description } = this
      this.$http.post('/api/potion-difficulty-levels', { name, description })
        .then(() => this.$router.go(-1))
        .catch(error => {
          if (error.response.status === 422) {
            let errors = error.response.data.errors
            this.errors.name = errors.name || null
            this.errors.description = errors.description || null
          }
        })
    },
    resetErrorMessages() {
      this.errors = {
        name: null,
        description: null
      }
    }
  }
}
</script>
