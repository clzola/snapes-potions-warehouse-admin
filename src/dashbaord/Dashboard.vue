<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <h2>Dashboard</h2>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  mounted() {
    this.$store.commit('setToolbarTitle', 'Dashbaord')
  }
}
</script>
