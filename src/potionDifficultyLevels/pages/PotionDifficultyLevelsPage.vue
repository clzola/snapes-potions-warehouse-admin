<template>
  <v-container fluid>
    <v-row >
      <v-col sm="12" xl="8" class="text-right">
        <v-btn to="/potion-difficulty-levels/create" color="primary">
          <v-icon left dark>mdi-plus</v-icon>
          Add
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="12" xl="8">
        <PotionDifficultyLevelsTable/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PotionDifficultyLevelsTable from '../components/PotionDifficultyLevelsTable'
export default {
  components: {
    PotionDifficultyLevelsTable
  },
  mounted() {
    this.$store.commit('setToolbarTitle', 'Potion Difficulty Levels')
  }
}
</script>
