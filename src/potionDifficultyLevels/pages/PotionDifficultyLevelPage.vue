<template>
  <PageLoader :loading="loading" :error="errorMessage">
    <template>
      <v-row>
        <v-col class="pl-1">
          <BackButton></BackButton>
          <EditButton v-if="!loading" :to="`/potion-difficulty-levels/${this.difficultyLevelId}/edit`"></EditButton>
          <DeleteButton v-if="!loading" @click="deleteDifficultyLevel"></DeleteButton>
          <ConfirmDeleteActionDialog ref="deleteDialog"/>
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
    </template>
  </PageLoader>
</template>

<script>
import BackButton from '../../shared/components/buttons/BackButton'
import EditButton from '../../shared/components/buttons/EditButton'
import DeleteButton from '../../shared/components/buttons/DeleteButton'
import ConfirmDeleteActionDialog from '../../shared/components/dialogs/ConfirmDeleteActionDialog'
import PageLoader from '../../shared/components/PageLoader'

export default {
  components: {
    BackButton,
    EditButton,
    DeleteButton,
    ConfirmDeleteActionDialog,
    PageLoader
  },
  data() {
    return {
      loading: true,
      errorMessage: null,
      difficultyLevelId: this.$route.params.id,
      difficultyLevel: {}
    }
  },
  mounted() {
    this.$store.commit('setToolbarTitle', 'Potion Difficulty Level')

    this.loadPotionDifficultyLevel()
  },
  methods: {
    loadPotionDifficultyLevel() {
      this.loading = true
      this.errorMessage = null
      this.$http.get(`/api/potion-difficulty-levels/${this.difficultyLevelId}`)
        .then(response => {
          this.difficultyLevel = response.data.data
        })
        .catch(error => { this.errorMessage = error.message })
        .finally(() => { this.loading = false })
    },
    deleteDifficultyLevel() {
      this.$refs.deleteDialog.title = 'Delete Potion Difficulty Level?'
      this.$refs.deleteDialog.message = `Are you sure you want to delete difficulty level named <b>${this.difficultyLevel.name}</b>?`

      this.$refs.deleteDialog.onConfirmed = () => {
        return this.$http
          .post(`/api/potion-difficulty-levels/${this.difficultyLevelId}`, { _method: 'DELETE' })
          .then(() => this.onDifficultyLevelDeleted(this.difficultyLevel))
      }

      this.$refs.deleteDialog.show()
    },
    onDifficultyLevelDeleted(difficultyLevel) {
      this.$router.push('/potion-difficulty-levels')
      this.$store.commit('setAlert', {
        status: 'success',
        message: `Difficulty level '${difficultyLevel.name}' has been successfully deleted!`
      })
    }
  }
}
</script>
