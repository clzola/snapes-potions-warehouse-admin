<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <BackButton></BackButton>
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
              <v-file-input show-size dense outlined
                v-model="picture"
                label="Picture"
                accept="image/png, image/jpeg">
              </v-file-input>
              <v-textarea dense outlined v-model="description"
                label="Description"
                :rules="rules.description"
                :error-messages="errors.description">
              </v-textarea>
              <v-text-field dense outlined v-model="amount"
                label="Amount"
                type="number"
                :rules="rules.amount"
                :error-messages="errors.amount">
              </v-text-field>
              <v-select dense outlined v-model="measurementUnit"
                :items="measurementUnits"
                label="Measurement Unit"
                :rules="rules.measurementUnit"
                :error-messages="errors.measurementUnit">
              </v-select>
              <v-btn :loading="saving" @click="save" color="primary">
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
import BackButton from '../../shared/components/buttons/BackButton'

export default {
  components: {
    BackButton
  },
  data() {
    return {
      valid: true,
      saving: false,
      measurementUnits: ['g', 'ml', 'quantity'],
      name: null,
      picture: null,
      description: null,
      amount: 0,
      measurementUnit: null,
      rules: {
        name: [
          v => !!v || 'The name field is required.'
        ],
        description: [
          v => !!v || 'The description field is required.'
        ],
        amount: [
          v => (v !== undefined && v !== null && v !== '') || 'This amount field is required.',
          v => v >= 0 || 'Amount cannot be less than zero.'
        ],
        measurementUnit: [
          v => !!v || 'This measurement unit field is required.'
        ]
      },
      errors: {
        name: null,
        description: null,
        amount: null,
        measurementUnit: null
      }
    }
  },
  mounted() {
    this.$store.commit('setToolbarTitle', 'Add New Ingredient')
  },
  methods: {
    save() {
      this.resetErrorMessages()
      if (!this.$refs.form.validate()) return

      this.saving = true

      let formData = new FormData()
      formData.set('name', this.name)
      formData.set('description', this.description)
      formData.set('amount', this.amount)
      formData.set('measurement_unit', this.measurementUnit)
      formData.set('picture', this.picture)

      this.$http.post('/api/ingredients', formData)
        .then(() => {
          this.$router.go(-1)
          this.$store.commit('setAlert', {
            status: 'success',
            message: `Successfully added new Ingredient named ${this.name}!`
          })
        })
        .catch(error => {
          if (error.response && error.response.status === 422) {
            let errors = error.response.data.errors
            this.errors.name = errors.name[0] || null
            this.errors.description = errors.description[0] || null
            this.errors.amount = errors.amount[0] || null
            this.errors.measurementUnit = errors.measurement_unit[0] || null
          }
        })
        .finally(() => { this.saving = false })
    },
    resetErrorMessages() {
      this.valid = true
      this.errors = {
        name: null,
        description: null,
        amount: null,
        measurementUnit: null
      }
    }
  }
}
</script>
