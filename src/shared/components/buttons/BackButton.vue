<template>
  <v-btn class="mx-2" @click="back">
    <v-icon left>mdi-arrow-left</v-icon>
    Back
  </v-btn>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>
