<template>
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
      <v-btn text icon x-small class="mx-2" color="error">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>

  </v-data-table>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: 'ID', align: 'left', sortable: true, value: 'id' },
        { text: 'Name', align: 'left', sortable: true, value: 'name' },
        { text: 'Description', align: 'left', sortable: false, value: 'description' },
        { text: '', sortable: false, value: 'actions' }
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
          // level.order -= 1
          // this.difficultyLevels = this.difficultyLevels.sort((a, b) => a.order <= b.order)
          this.loadPotionDifficultyLevels()
        })
    },
    moveDown(level) {
      if (level.order === this.difficultyLevels.length) { return }

      let data = { _method: 'PATCH', order: level.order + 1 }
      this.$http.post(`/api/potion-difficulty-levels/${level.id}`, data)
        .then((response) => {
          // level.order -= 1
          // this.difficultyLevels = this.difficultyLevels.sort((a, b) => a.order <= b.order)
          this.loadPotionDifficultyLevels()
        })
    }
  }
}
</script>
