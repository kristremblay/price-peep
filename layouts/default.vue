<template>
  <v-app dark>
    <v-app-bar app fixed dark color="primary">
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn color="transparent" depressed @click="processLogout">Logout</v-btn>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }} Kris Tremblay</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      title: 'Price Peep'
    }
  },
  methods: {
    ...mapActions({
      logout: 'user/logout'
    }),
    processLogout() {
      this.logout().then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>
