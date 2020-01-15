<template>
  <v-container fluid>
    <v-snackbar top right v-model="snackbar">
      {{ snackbarMessage }}
      <v-btn color="green" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>

    <v-row v-if="loading">
      <v-col>
        <v-progress-linear indeterminate></v-progress-linear>
      </v-col>
    </v-row>
    <v-row v-if="!errorMessage">
      <v-col class="pl-1">
        <BackButton></BackButton>
        <EditButton v-if="!loading" :to="`/potion-categories/${this.potionCategoryId}/edit`"></EditButton>
        <DeleteButton v-if="!loading" @click="deletePotionCategory"></DeleteButton>
      </v-col>
    </v-row>
    <v-row v-if="!loading">
      <v-col v-if="!errorMessage" sm="6" xl="4">
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
      <v-col v-if="errorMessage" sm="12" class="text-center mt-12">
        <div class="ma-4 red--text">{{ errorMessage }}</div>
        <v-btn @click="navigateBack">
          <v-icon left>mdi-arrow-left</v-icon>
          Back
        </v-btn>
        <v-btn class="mx-2" color="blue" dark @click="loadPotionCategory">
          <v-icon left>mdi-reload</v-icon>
          Reload
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BackButton from '../../shared/components/buttons/BackButton'
import EditButton from '../../shared/components/buttons/EditButton'
import DeleteButton from '../../shared/components/buttons/DeleteButton'

export default {
  components: {
    BackButton,
    EditButton,
    DeleteButton
  },
  data() {
    return {
      loading: true,
      potionCategoryId: this.$route.params.id,
      potionCategory: {},
      errorMessage: null,
      snackbar: false,
      snackbarMessage: null
    }
  },
  mounted() {
    this.$store.commit('setToolbarTitle', 'Potion Category')
    this.loadPotionCategory()
  },
  methods: {
    navigateBack() {
      this.$router.go(-1)
    },
    loadPotionCategory() {
      this.loading = true
      this.$http
        .get(`/api/potion-categories/${this.potionCategoryId}`)
        .then(response => {
          this.loading = false
          this.potionCategory = response.data.data
        })
        .catch((error) => {
          this.loading = false
          this.errorMessage = error.message
        })
    },
    deletePotionCategory() {
      this.$http
        .post(`/api/potion-categories/${this.potionCategoryId}`, { _method: 'DELETE' })
        .then(() => {
          this.$router.push('/potion-categories')
          this.$store.commit('setAlert', {
            status: 'success',
            message: `Potion Category '${this.potionCategory.name}' has been successfully deleted!`
          })
        })
        .catch((error) => {
          this.showSnackbar(error.message)
        })
    },
    showSnackbar(message) {
      this.snackbarMessage = message
      this.snackbar = true
    }
  }
}
</script>
