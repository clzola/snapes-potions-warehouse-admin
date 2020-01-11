<template>
  <v-content>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-img src="../assets/slytherin_crest.png" max-height="360" contain></v-img>
          <v-card class="elevation-12 mt-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Login form</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field outlined label="E-Mail Address" name="email" prepend-icon="mdi-email" type="email"></v-text-field>
                <v-text-field outlined label="Password" name="password" prepend-icon="mdi-lock" type="password"></v-text-field>
              </v-form>
            </v-card-text>
             <v-card-actions>
              <v-spacer />
              <v-btn text>Forgot your password?</v-btn>
              <v-btn color="primary">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
export default {

}
</script>
