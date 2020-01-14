<template>
  <v-container fluid>
    <v-row >
      <v-col sm="12" lg="10" xl="7" class="text-right">
        <v-btn color="primary">
          <v-icon left dark>mdi-plus</v-icon>
          Create
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="12" lg="10" xl="7">
        <PotionCategoriesTable/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PotionCategoriesTable from './PotionCategoriesTable'

export default {
  components: {
    PotionCategoriesTable
  },
  mounted() {
    this.$store.commit('setToolbarTitle', 'Potion Categories')
  }
}
</script>
