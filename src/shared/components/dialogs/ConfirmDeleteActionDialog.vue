<template>
  <v-dialog v-model="dialog" max-width="400" persistent>
    <v-card>
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-card-text>
        <div v-if="!error">
          <div v-if="!loading" v-html="message"></div>
          <div v-if="loading" class="text-center my-5">
            <v-progress-circular color="blue" indeterminate></v-progress-circular>
          </div>
        </div>
        <div v-else class="red--text">An error ocured while deleting resource: '{{ error }}'</div>
      </v-card-text>
      <v-card-actions v-if="!loading">
        <v-spacer></v-spacer>
        <v-btn text @click="dismiss">
          <span v-if="!error">No</span>
          <span v-else>Cancel</span>
        </v-btn>
        <v-btn color="red darken-1" text @click="onConfirm">
          <span v-if="!error">Yes</span>
          <span v-else>Try Again</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      title: null,
      message: null,
      onConfirmed: null,
      loading: false,
      error: null
    }
  },
  methods: {
    show() {
      this.dialog = true
    },
    dismiss() {
      this.dialog = false
      this.$nextTick(() => {
        this.reset()
      })
    },
    onConfirm() {
      if (!this.onConfirmed) {
        this.dismiss()
        return
      }

      this.loading = true
      this.error = null
      this.onConfirmed()
        .then(() => this.dismiss())
        .catch((error) => {
          this.loading = false
          this.error = error.message
        })
    },
    reset() {
      this.title = null
      this.message = null
      this.loading = false
      this.error = null
      this.onConfirmed = null
    }
  }
}
</script>
