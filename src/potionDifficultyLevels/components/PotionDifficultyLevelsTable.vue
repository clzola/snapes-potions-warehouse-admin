<template>
  <div>
    <v-data-table
      class="elevation-1"
      :headers="headers"
      :hide-default-footer="true"
      :loading="loading"
      :items="difficultyLevels"
      loading-text="Loading potion difficulty levels...">

      <template v-slot:item.actions="{ item }">
        <v-btn text icon x-small class="mx-2" @click="moveUp(item)">
          <v-icon>mdi-chevron-up</v-icon>
        </v-btn>
        <v-btn text icon x-small class="mx-2" @click="moveDown(item)">
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
        <v-btn text icon x-small class="mx-2" color="blue" :to="`/potion-difficulty-levels/${item.id}`">
          <v-icon>mdi-eye</v-icon>
        </v-btn>
        <v-btn text icon x-small class="mx-2" color="green" :to="`/potion-difficulty-levels/${item.id}/edit`">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn text icon x-small class="mx-2" color="error" @click="deleteDifficultyLevel(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>

    </v-data-table>
    <ConfirmDeleteActionDialog ref="deleteDialog"/>
  </div>
</template>

<script>
import ConfirmDeleteActionDialog from '../../shared/components/dialogs/ConfirmDeleteActionDialog'

export default {
  components: {
    ConfirmDeleteActionDialog
  },
  data() {
    return {
      headers: [
        { text: 'ID', align: 'left', sortable: true, value: 'id' },
        { text: 'Name', align: 'left', sortable: true, value: 'name' },
        { text: 'Description', align: 'left', sortable: false, value: 'description' },
        { text: '', align: 'right', sortable: false, value: 'actions' }
      ],
      loading: false,
      difficultyLevels: []
    }
  },
  mounted() {
    this.loadPotionDifficultyLevels()
  },
  methods: {
    loadPotionDifficultyLevels() {
      this.loading = true
      this.$http.get('/api/potion-difficulty-levels').then(response => {
        this.difficultyLevels = response.data.data.map((level) => {
          level.description = (level.description.length > 80) ? level.description.substr(0, 79) + '...' : level.description
          return level
        })
        this.loading = false
      })
    },
    moveUp(level) {
      if (level.order === 1) { return }

      let data = { _method: 'PATCH', order: level.order - 1 }
      this.$http.post(`/api/potion-difficulty-levels/${level.id}`, data)
        .then((response) => {
          let oldOrder = level.order
          level.order -= 1
          this.difficultyLevels
            .filter(l => l.id !== level.id && l.order >= level.order && l.order <= oldOrder)
            .forEach(l => { l.order += 1 })
          this.difficultyLevels = this.difficultyLevels.sort((a, b) => a.order <= b.order ? -1 : 1)
        })
    },
    moveDown(level) {
      if (level.order === this.difficultyLevels.length) { return }

      let data = { _method: 'PATCH', order: level.order + 1 }
      this.$http.post(`/api/potion-difficulty-levels/${level.id}`, data)
        .then((response) => {
          let oldOrder = level.order
          level.order += 1
          this.difficultyLevels
            .filter(l => l.id !== level.id && l.order >= oldOrder && l.order <= level.order)
            .forEach(l => { l.order -= 1 })
          this.difficultyLevels = this.difficultyLevels.sort((a, b) => a.order <= b.order ? -1 : 1)
        })
    },
    deleteItem(level) {
      this.$http.post(`/api/potion-difficulty-levels/${level.id}`, { _method: 'DELETE' })
        .then(() => {
          this.difficultyLevels = this.difficultyLevels.filter(l => l.id !== level.id)
        })
    },
    deleteDifficultyLevel(level) {
      this.$refs.deleteDialog.title = 'Delete Potion Difficulty Level?'
      this.$refs.deleteDialog.message = `Are you sure you want to delete potion difficuly level named <b>${level.name}</b>?`

      this.$refs.deleteDialog.onConfirmed = () => {
        return this.$http
          .post(`/api/potion-difficulty-levels/${level.id}`, { _method: 'DELETE' })
          .then(() => this.onDifficultyLevelDeleted(level))
      }

      this.$refs.deleteDialog.show()
    },
    onDifficultyLevelDeleted(difficultyLevel) {
      this.difficultyLevels = this.difficultyLevels.filter(
        (level) => level.id !== difficultyLevel.id
      )
      this.$store.commit('setAlert', {
        status: 'success',
        message: `Potion difficulty level '${difficultyLevel.name}' has been successfully deleted!`
      })
    }
  }
}
</script>
