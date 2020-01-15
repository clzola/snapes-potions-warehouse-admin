<template>
  <v-content>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" lg="6">
          <v-img src="../assets/slytherin_crest.png" max-height="200" contain></v-img>
          <v-card class="elevation-12 mt-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Login form</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field dense outlined v-model="email" :error-messages="errorMessage" label="E-Mail Address" name="email" prepend-icon="mdi-email" type="email"></v-text-field>
                <v-text-field dense outlined v-model="password" label="Password" name="password" prepend-icon="mdi-lock" type="password"></v-text-field>
              </v-form>
            </v-card-text>
             <v-card-actions>
              <v-spacer />
              <v-btn text>Forgot your password?</v-btn>
              <v-btn color="primary" @click="login" :loading="isLoading">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      email: 'snape@slytherin.org',
      password: 'secret',
      errorMessage: null
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.auth.status === 'loading'
    }
  },
  methods: {
    login() {
      this.clearErrorMessage()

      let credentials = { email: this.email, password: this.password }

      this.$store.dispatch('login', credentials)
        .then(() => this.$router.push('/'))
        .catch(this.onLoginError)
    },
    onLoginError(error) {
      let errorMessage = 'Unknown error occured, please try again later...'
      if (error.response.status === 401) {
        errorMessage = 'Provided credentials does not match any in the database.'
      }

      this.setErrorMessage(errorMessage)
    },
    setErrorMessage(message) {
      this.errorMessage = message
    },
    clearErrorMessage() {
      this.setErrorMessage(null)
    }
  }
}
</script>
