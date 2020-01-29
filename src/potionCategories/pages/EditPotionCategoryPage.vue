<template>
  <PageLoader :loading="loading" :error="errorMessage" @reload="loadPotionCategory">
    <div>
      <v-row>
        <v-col class="pl-1">
          <BackButton></BackButton>
        </v-col>
      </v-row>
      <v-row>
        <v-col sm="6" xl="4">
          <v-card>
            <v-card-text>
              <v-form v-model="valid" ref="form">
                <v-text-field dense outlined v-model="potionCategory.name"
                  label="Name"
                  :error-messages="errors.name"
                  :rules="rules.name">
                </v-text-field>
                <v-textarea dense outlined v-model="potionCategory.description"
                  label="Description"
                  :error-messages="errors.description"
                  :rules="rules.description">
                </v-textarea>
                <v-btn :loading="saving" @click="save" color="primary">
                  <v-icon left>mdi-content-save</v-icon>
                  Save
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
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
      potionCategoryId: this.$route.params.id,
      potionCategory: {},
      rules: {
        name: [
          v => !!v || 'The name field is required.'
        ],
        description: [
          v => !!v || 'The description field is required.'
        ]
      },
      errors: {
        name: null,
        description: null
      },
      saving: false
    }
  },
  mounted() {
    this.$store.commit('setToolbarTitle', 'Edit Potion Category')
    this.loadPotionCategory()
  },
  methods: {
    loadPotionCategory() {
      this.setLoading(true)
      this.$http.get(`/api/potion-categories/${this.potionCategoryId}`)
        .then(response => { this.potionCategory = response.data.data })
        .catch(e => this.setError(e.message))
        .finally(() => this.setLoading(false))
    },
    save() {
      if (this.$store.state.admin.alert) {
        this.$store.commit('dissmisAlert')
      }

      if (!this.$refs.form.validate()) return

      this.saving = true
      let { name, description } = this.potionCategory

      this.$http
        .post(`/api/potion-categories/${this.potionCategory.id}`, { name, description, _method: 'PUT' })
        .then(this.onSaved)
        .catch(error => {
          if (error.response && error.response.status === 422) {
            let errors = error.response.data.errors
            this.errors.name = errors.name || null
            this.errors.description = errors.description || null
            this.valid = false
            return
          }

          this.$store.commit('setAlert', {
            status: 'error',
            message: error.message
          })
        })
        .finally(() => { this.saving = false })
    },
    onSaved() {
      this.$router.go(-1)
      this.$store.commit('setAlert', {
        status: 'success',
        message: `Potion Category has been successfully updated!`
      })
    },
    setLoading(value) {
      this.loading = value
    },
    setError(message) {
      this.errorMessage = message
    }
  }
}
</script>
