<template>
  <v-card>
    <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-search"
        label="Search"
        single-line
        hide-details
        @change="onSearchChanged"
      ></v-text-field>
    </v-card-title>
    <v-data-table class="elevation-1"
      :headers="headers"
      :loading="loading"
      :items="ingredients"
      :options.sync="options"
      :footer-props="footerOptions"
      :server-items-length="totalIngredients"
      multi-sort
      loading-text="Loading ingredients...">

      <template v-slot:item.picture_url="{ item }">
        <img :src="item.picture_url" class="ma-2 pa-2 ingredient-picture" style=""/>
      </template>

      <template v-slot:item.description="{ item }">
        {{ (item.description.length > 200) ? item.description.substr(0, 199) + '...' : item.description }}
      </template>

      <template v-slot:item.amount="{ item }">
        {{ item.amount }}{{ item.measurement_unit }}
      </template>

      <template v-slot:item.actions="{ item }">
        <ViewButton :to="`/ingredients/${item.id}`"></ViewButton>
        <EditButton :to="`/ingredients/${item.id}/edit`"></EditButton>
        <DeleteButton @click="deleteIngredient(item)"></DeleteButton>
      </template>

      <template v-if="error" v-slot:no-data>
        <div class="py-8">
          <span class="red--text d-block">{{ error }}</span>
          <v-btn small color="light-blue" dark class="mt-3" @click="loadCurrentPage">
            <v-icon left>mdi-refresh</v-icon>
            Reload
          </v-btn>
        </div>
      </template>
    </v-data-table>
    <ConfirmDeleteActionDialog ref="deleteDialog"/>
  </v-card>
</template>

<script>
import Qs from 'qs'
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
        { text: 'Picture', align: 'left', sortable: false, value: 'picture_url' },
        { text: 'Name', align: 'left', sortable: true, value: 'name' },
        { text: 'Description', align: 'left', sortable: false, value: 'description' },
        { text: 'Amount', align: 'left', sortable: false, value: 'amount' },
        { text: '', align: 'right', sortable: false, value: 'actions' }
      ],
      footerOptions: {
        itemsPerPageOptions: [1, 5, 10, 15, 20, 25, 50]
      },
      loading: false,
      error: null,
      ingredients: [],
      totalIngredients: 0,
      options: {},
      search: ''
    }
  },
  watch: {
    options: {
      handler() {
        // sortBy, sortDesc,
        const { sortBy, sortDesc, page, itemsPerPage } = this.options
        this.getIngredients({ searchTerm: this.search }, { sortBy, sortDesc }, page, itemsPerPage)
      },
      deep: true
    }
  },
  // mounted() {
  //   this.getIngredients(null, 1)
  // },
  methods: {
    getIngredients(filter, sorting, page, itemsPerPage) {
      console.log(sorting)
      this.loading = true

      let params = {
        page,
        per_page: itemsPerPage
      }

      if (sorting.sortBy.length > 0) {
        params['sort'] = []
        for (let i = 0; i < sorting.sortBy.length; i++) {
          params['sort'].push({
            column: sorting.sortBy[0],
            direction: sorting.sortDesc[0] ? 'desc' : 'asc'
          })
        }
      }

      if (filter && filter.searchTerm) {
        params['search_term'] = filter.searchTerm
      }

      let requestOptions = {
        params,
        paramsSerializer: (params) => Qs.stringify(params, { encodeValuesOnly: true })
      }

      this.$http.get('/api/ingredients/search', requestOptions)
        .then(response => response.data)
        .then(page => {
          this.ingredients = page.data
          this.totalIngredients = page.meta.total
        })
        .finally(() => { this.loading = false })
    },
    onSearchChanged(searchTerm) {
      const { sortBy, sortDesc, page, itemsPerPage } = this.options
      this.getIngredients({ searchTerm: searchTerm }, { sortBy, sortDesc }, page, itemsPerPage)
    },
    deleteIngredient(ingredient) {

    }
  }
}
</script>

<style lang="sass" scoped>
.ingredient-picture
  width: 128px
  height: 128px
  object-fit: contain
  border: 2px solid grey
</style>
