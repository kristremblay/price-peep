<template>
  <v-app id="login-page-app" dark>
    <v-content>
      <v-container fill-height>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<style lang="scss" scoped>
#login-page-app {
  background-color: #1d2675;
}
</style>

<script>
export default {
  data() {
    return {
      title: 'LOGIN'
    }
  }
}
</script>
