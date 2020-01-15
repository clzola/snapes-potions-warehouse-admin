<template>
  <v-container fluid>
    <v-row>
      <v-col sm="12" xl="8">
        <PotionDifficultyLevelsTable/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PotionDifficultyLevelsTable from './PotionDifficultyLevelsTable'
export default {
  components: {
    PotionDifficultyLevelsTable
  },
  mounted() {
    this.$store.commit('setToolbarTitle', 'Potion Difficulty Levels')
  }
}
</script>
