<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <Menu></Menu>
    </v-navigation-drawer>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container>
        <v-row>
          <v-col>
            <v-card>
              <v-card-text>
                <h2>Admin Panel</h2>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
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
  }
}
</script>
