<template>
  <v-app>
    <Login/>
  </v-app>
</template>

<script>
// import Admin from './admin/Admin'
import Login from './login/Login'

export default {
  name: 'App',

  components: {
    // Admin,
    Login
  },

  data: () => ({
    //
  })
}
</script>
