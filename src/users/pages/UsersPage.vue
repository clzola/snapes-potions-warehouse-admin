<template>
  <v-container fluid>
    <v-row >
      <v-col sm="12" xl="8" class="text-right">
        <v-btn to="/users/create" color="primary">
          <v-icon left dark>mdi-plus</v-icon>
          Add
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="12" xl="8">
        <UsersDataTable></UsersDataTable>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UsersDataTable from '../components/UsersDataTable'
export default {
  components: {
    UsersDataTable
  },
  mounted() {
    this.$store.commit('setToolbarTitle', 'Users')
  }
}
</script>
