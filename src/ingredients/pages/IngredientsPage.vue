<template>
  <v-container fluid>
    <v-row>
      <v-col sm="12" xl="8" class="text-right">
        <v-btn color="primary">
          <v-icon left dark>mdi-plus</v-icon>
          Add
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  mounted() {
    this.$store.commit('setToolbarTitle', 'Ingredients')
  }
}
</script>
