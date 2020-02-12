<template>
  <v-container fluid>
    <v-row>
      <v-col sm="12" xl="8" class="text-right">
        <v-btn to="/ingredients/create" color="primary">
          <v-icon left dark>mdi-plus</v-icon>
          Add
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="12" xl="8">
        <IngredientsDataTable/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import IngredientsDataTable from '../components/IngredientsDataTable'

export default {
  components: { IngredientsDataTable },
  mounted() {
    this.$store.commit('setToolbarTitle', 'Ingredients')
  }
}
</script>
