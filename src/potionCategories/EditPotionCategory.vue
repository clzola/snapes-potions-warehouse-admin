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
            <v-form>
              <v-text-field dense outlined v-model="potionCategory.name"
                label="Name"
                :error-messages="errors.name">
              </v-text-field>
              <v-textarea dense outlined v-model="potionCategory.description"
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
      potionCategoryId: this.$route.params.id,
      potionCategory: {},
      errors: {
        name: null,
        description: null
      }
    }
  },
  mounted() {
    this.$store.commit('setToolbarTitle', 'Edit Potion Category')

    this.$http.get(`/api/potion-categories/${this.potionCategoryId}`)
      .then(response => {
        this.potionCategory = response.data.data
      })
  },
  methods: {
    navigateBack() {
      this.$router.go(-1)
    },
    save() {
      let { name, description } = this.potionCategory
      this.$http
        .post(`/api/potion-categories/${this.potionCategory.id}`, { name, description, _method: 'PUT' })
        .then(() => this.$router.go(-1))
    }
  }
}
</script>
