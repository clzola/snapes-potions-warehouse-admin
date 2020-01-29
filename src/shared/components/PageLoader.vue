<template>
  <v-container fluid>
    <template v-if="loading">
      <v-row>
        <v-col>
          <v-progress-linear indeterminate></v-progress-linear>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pl-1">
          <BackButton></BackButton>
        </v-col>
      </v-row>
    </template>
    <v-row v-else-if="!loading && error">
      <v-col sm="12" class="text-center mt-12">
        <div class="ma-4 red--text">{{ error }}</div>
        <BackButton></BackButton>
        <v-btn class="mx-2" color="blue" dark @click="$emit('reload')">
          <v-icon left>mdi-reload</v-icon>
          Reload
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-else-if="!loading && !error">
      <v-col>
        <slot></slot>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BackButton from '../../shared/components/buttons/BackButton'

export default {
  components: {
    BackButton
  },
  props: [ 'loading', 'error' ]
}
</script>
