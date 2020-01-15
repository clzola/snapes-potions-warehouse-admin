<template>
  <v-container fluid>
    <v-row >
      <v-col sm="12" xl="8" class="text-right">
        <v-btn to="/potion-categories/create" color="primary">
          <v-icon left dark>mdi-plus</v-icon>
          Add
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="12" xl="8">
        <PotionCategoriesTable/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PotionCategoriesTable from '../components/PotionCategoriesTable'

export default {
  components: {
    PotionCategoriesTable
  },
  mounted() {
    this.$store.commit('setToolbarTitle', 'Potion Categories')
  }
}
</script>
