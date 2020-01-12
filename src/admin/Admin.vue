<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <Menu></Menu>
    </v-navigation-drawer>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">
            User Name
            <v-icon right>mdi-menu-down</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </div>
</template>

<script>
import Menu from './Menu'

export default {
  name: 'app-admin',
  components: {
    Menu
  },
  data() {
    return {
      drawer: null
    }
  },
  methods: {
    logout() {
      this.$store.commit('setAccessToken', null)
      this.$router.push('/login')
    }
  }
}
</script>
