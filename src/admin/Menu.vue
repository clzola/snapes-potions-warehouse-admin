<template>
  <div>
    <MenuHeader></MenuHeader>
    <v-divider></v-divider>
    <v-list dense>
      <MenuItem icon="mdi-view-dashboard" title="Dashbaord" href="/"></MenuItem>
      <MenuItem icon="mdi-flask-empty" title="Potions" href="/potions"></MenuItem>
      <MenuItem icon="mdi-chart-bubble" title="Ingredients"></MenuItem>
      <MenuItem icon="mdi-account-multiple" title="Users" href="/users"></MenuItem>

      <v-list-group prepend-icon="mdi-settings">
        <template v-slot:activator>
          <v-list-item-title>Settings</v-list-item-title>
        </template>

        <MenuItem title="Potion Categories" href="/potion-categories"></MenuItem>
        <MenuItem title="Difficulty Levels" href="/potion-difficulty-levels"></MenuItem>
      </v-list-group>
    </v-list>
  </div>
</template>

<script>
import MenuItem from './MenuItem'
import MenuHeader from './MenuHeader'

export default {
  name: 'app-menu',
  components: {
    MenuHeader,
    MenuItem
  }
}
</script>
