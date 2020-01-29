<template>
  <PageLoader :loading="loading" :error="errorMessage">
    <template>
      <v-row>
        <v-col class="pl-1">
          <BackButton></BackButton>
        </v-col>
      </v-row>
      <v-row>
        <v-col sm="8" xl="4">
          <v-card>
            <v-card-text>
              <v-form ref="form" v-model="valid">
                <v-text-field dense outlined v-model="difficultyLevel.name"
                  label="Name"
                  :rules="rules.name"
                  :error-messages="errors.name">
                </v-text-field>
                <v-textarea dense outlined v-model="difficultyLevel.description"
                  label="Description"
                  :rules="rules.description"
                  :error-messages="errors.description">
                </v-textarea>
                <v-text-field dense outlined v-model="difficultyLevel.order"
                  label="Order"
                  :rules="rules.order"
                  :error-messages="errors.order">
                </v-text-field>
                <v-btn :loading="saving" @click="save" color="primary">
                  <v-icon left>mdi-content-save</v-icon>
                  Save
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </PageLoader>
</template>

<script>
import BackButton from '../../shared/components/buttons/BackButton'
import PageLoader from '../../shared/components/PageLoader'

export default {
  components: {
    BackButton,
    PageLoader
  },
  data() {
    return {
      loading: true,
      errorMessage: null,
      valid: true,
      saving: false,
      difficultyLevelId: this.$route.params.id,
      difficultyLevel: {},
      rules: {
        name: [
          v => !!v || 'The name field is required'
        ],
        description: [
          v => !!v || 'The description field is required.'
        ],
        order: [
          v => !!v || 'The order field is required.',
          v => parseInt(v) >= 1 || 'The order must be greater or equal to 1'
        ]
      },
      errors: {
        name: null,
        description: null,
        order: null
      }
    }
  },
  mounted() {
    this.$store.commit('setToolbarTitle', 'Edit Potion Difficulty Level')
    this.loadPotionDifficultyLevel()
  },
  methods: {
    loadPotionDifficultyLevel() {
      this.loading = true
      this.$http.get(`/api/potion-difficulty-levels/${this.difficultyLevelId}`)
        .then(response => {
          this.difficultyLevel = response.data.data
        })
        .catch((e) => { this.errorMessage = e.message })
        .finally(() => { this.loading = false })
    },
    save() {
      this.resetErrorMessages()
      if (!this.$refs.form.validate()) return

      this.valid = true
      this.saving = true

      let { name, description, order } = this.difficultyLevel

      this.$http
        .post(`/api/potion-difficulty-levels/${this.difficultyLevel.id}`, { name, description, order, _method: 'PUT' })
        .then(() => this.$router.go(-1))
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            let errors = error.response.data.errors
            this.errors.name = errors.name || null
            this.errors.description = errors.description || null
            this.errors.order = errors.order || null
            this.valid = false
          }
        })
        .finally(() => { this.saving = false })
    },
    resetErrorMessages() {
      this.errors = {
        name: null,
        description: null,
        order: null
      }
    }
  }
}
</script>
