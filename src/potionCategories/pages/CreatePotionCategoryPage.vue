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
            <v-form ref="form" v-model="valid">
              <v-text-field dense outlined v-model="name"
                label="Name"
                :rules="rules.name"
                :error-messages="errors.name">
              </v-text-field>
              <v-textarea dense outlined v-model="description"
                label="Description"
                :rules="rules.description"
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
      valid: true,
      name: null,
      description: null,
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
      }
    }
  },
  mounted() {
    this.$store.commit('setToolbarTitle', 'Add New Potion Category')
  },
  methods: {
    navigateBack() {
      this.$router.go(-1)
    },
    save() {
      this.resetErrorMessages()
      if (!this.$refs.form.validate()) return
      let { name, description } = this
      this.$http.post('/api/potion-categories', { name, description })
        .then(() => {
          this.$router.go(-1)
          this.$store.commit('setAlert', {
            status: 'success',
            message: `Successfully created new Potion Category named ${name}!`
          })
        })
        .catch(error => {
          if (error.response && error.response.status === 422) {
            let errors = error.response.data.errors
            this.errors.name = errors.name[0] || null
            this.errors.description = errors.description[0] || null
            this.valid = false
          }
        })
    },
    reset() {
      this.$refs.form.reset()
      this.resetErrorMessages()
    },
    resetErrorMessages() {
      this.valid = true
      this.errors = {
        name: null,
        description: null
      }
    }
  }
}
</script>
