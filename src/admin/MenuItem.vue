<template>
  <v-list-item :to="href" active-class="active-link">
    <v-list-item-action>
      <v-icon>{{ icon }}</v-icon>
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title>{{ title }}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'app-menu-item',
  props: ['icon', 'title', 'href']
}
</script>

<style lang="sass" scoped>
.active-link
  background-color: #06ff5b2b
  color: #1a472a
</style>
