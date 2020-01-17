<template>
  <div>
    <v-data-table
      class="elevation-1"
      :headers="headers"
      :hide-default-footer="true"
      :loading="loading"
      :items="potionCategories"
      loading-text="Loading potion categories...">

      <template v-slot:item.actions="{ item }">
        <ViewButton :to="`/potion-categories/${item.id}`"></ViewButton>
        <EditButton :to="`/potion-categories/${item.id}/edit`"></EditButton>
        <DeleteButton @click="deletePotionCategory(item)"></DeleteButton>
      </template>

      <template v-if="error" v-slot:no-data>
        <div class="py-8">
          <span class="red--text d-block">{{ error }}</span>
          <v-btn small color="light-blue" dark class="mt-3" @click="loadPotionCategories">
            <v-icon left>mdi-refresh</v-icon>
            Reload
          </v-btn>
        </div>
      </template>
    </v-data-table>
    <ConfirmDeleteActionDialog ref="deleteDialog"/>
  </div>
</template>

<script>
import ViewButton from '../../shared/components/buttons/TableViewButton'
import EditButton from '../../shared/components/buttons/TableEditButton'
import DeleteButton from '../../shared/components/buttons/TableDeleteButton'
import ConfirmDeleteActionDialog from '../../shared/components/dialogs/ConfirmDeleteActionDialog'

export default {
  components: {
    ViewButton,
    EditButton,
    DeleteButton,
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
      error: null,
      potionCategories: []
    }
  },
  mounted() {
    this.loadPotionCategories()
  },
  methods: {
    loadPotionCategories() {
      this.loading = true
      this.$http.get('/api/potion-categories')
        .then(this.onPotionCategoriesResponse)
        .catch((error) => { this.error = error.message })
        .finally(() => { this.loading = false })
    },
    onPotionCategoriesResponse(response) {
      this.potionCategories = response.data.data.map((category) => {
        category.description = (category.description.length > 80) ? category.description.substr(0, 79) + '...' : category.description
        return category
      })
    },
    deletePotionCategory(potionCategory) {
      this.$refs.deleteDialog.title = 'Delete Potion Category?'
      this.$refs.deleteDialog.message = `Are you sure you want to delete potion category named <b>${potionCategory.name}</b>?`

      this.$refs.deleteDialog.onConfirmed = () => {
        return this.$http
          .post(`/api/potion-categories/${potionCategory.id}`, { _method: 'DELETE' })
          .then(() => this.onPotionCategoryDeleted(potionCategory))
      }

      this.$refs.deleteDialog.show()
    },
    onPotionCategoryDeleted(potionCategory) {
      this.potionCategories = this.potionCategories.filter(
        (category) => category.id !== potionCategory.id
      )
      this.$store.commit('setAlert', {
        status: 'success',
        message: `Potion Category '${potionCategory.name}' has been successfully deleted!`
      })
    }
  }
}
</script>
