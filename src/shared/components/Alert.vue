<template>
  <transition name="fade">
    <div v-if="alert" class="alert px-4 py-2 d-flex align-center justify-center" :class="alertClasses">
      <div class="d-inline-block mx-auto" :class="{'white--text': alert.status !== 'warning' }">
        {{ alert.message }}
      </div>
      <v-btn text icon x-small :dark="alert.status !== 'warning'" @click="dismiss">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      alert: state => state.admin.alert
    }),
    alertClasses() {
      return {
        'green': this.alert.status === 'success',
        'red': this.alert.status === 'error',
        'yellow': this.alert.status === 'warning'
      }
    }
  },
  methods: {
    dismiss() {
      this.$store.commit('dismissAlert')
    }
  }
}
</script>
