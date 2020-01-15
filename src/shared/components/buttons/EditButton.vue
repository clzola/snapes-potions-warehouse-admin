<template>
  <v-btn :to="to" @click="$emit('click')" class="mx-2" color="green" dark>
    <v-icon left>mdi-pencil</v-icon>
    Edit
  </v-btn>
</template>

<script>
export default {
  props: ['to']
}
</script>
