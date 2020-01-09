import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

// Slytherin Color Palette: https://www.color-hex.com/color-palette/815

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#2a623d',
        secondary: '#1a472a',
        accent: '#5d5d5d'
      }
    }
  }
})
