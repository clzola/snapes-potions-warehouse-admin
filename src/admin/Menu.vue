<template>
  <div>
    <MenuHeader></MenuHeader>
    <v-divider></v-divider>
    <v-list dense>
      <MenuItem icon="mdi-flask-empty" title="Potions"></MenuItem>
      <MenuItem icon="mdi-chart-bubble" title="Ingredients"></MenuItem>
      <MenuItem icon="mdi-account-multiple" title="Users"></MenuItem>

      <v-list-group prepend-icon="mdi-settings">
        <template v-slot:activator>
          <v-list-item-title>Settings</v-list-item-title>
        </template>

        <MenuItem title="Potion Categories"></MenuItem>
        <MenuItem title="Difficulty Levels"></MenuItem>
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
