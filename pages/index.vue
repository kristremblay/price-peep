<template>
  <v-container>
    <v-row fill-height align="center" justify="center">
      <v-col cols="12" sm="8" md="6" xl="4">
        <LoginForm />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LoginForm from '~/components/LoginForm'

export default {
  layout: 'login',
  components: {
    LoginForm
  }
}
</script>
