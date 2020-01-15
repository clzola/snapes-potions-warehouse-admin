<template>
  <v-btn text icon x-small class="mx-2" color="green" :to="to" @click="$emit('click')">
    <v-icon>mdi-pencil</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: ['to']
}
</script>
