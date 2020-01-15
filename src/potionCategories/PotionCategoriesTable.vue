<template>
  <v-data-table
    class="elevation-1"
    :headers="headers"
    :hide-default-footer="true"
    :loading="loading"
    :items="potionCategories"
    loading-text="Loading potion categories...">

    <template v-slot:item.actions="{ item }">
      <v-btn text icon x-small :to="`/potion-categories/${item.id}/edit`">
        <v-icon>mdi-pencil</v-icon>
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
      potionCategories: []
    }
  },
  mounted() {
    this.loadPotionCategories()
  },
  methods: {
    loadPotionCategories() {
      this.loading = true
      this.$http.get('/api/potion-categories').then(response => {
        this.potionCategories = response.data.data.map((category) => {
          category.description = (category.description.length > 80) ? category.description.substr(0, 79) + '...' : category.description
          return category
        })
        this.loading = false
      })
    }
  }
}
</script>
