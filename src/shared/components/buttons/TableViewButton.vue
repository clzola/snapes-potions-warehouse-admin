<template>
  <v-btn text icon x-small class="mx-2" color="blue" :to="to" @click="$emit('click')">
    <v-icon>mdi-eye</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: ['to']
}
</script>
