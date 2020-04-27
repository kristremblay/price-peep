<template>
  <v-form ref="form" lazy-validation @submit.prevent="login">
    <v-card elevation="6" class="pa-6" light>
      <v-card-title class="background-color: #F00">Login</v-card-title>
      <v-card-subtitle>
        Check the README for credentials.
        <v-alert v-if="submissionError" color="error" class="my-6" dark>
          {{ submissionError }}
        </v-alert>
      </v-card-subtitle>
      <v-card-text>
        <v-text-field
          ref="email"
          v-model="email"
          color="primary"
          label="E-mail Address"
          :rules="[rules.required, rules.email]"
          prepend-inner-icon="mdi-account"
          autocomplete="email"
          autofocus
        />
        <v-text-field
          v-model="password"
          color="primary"
          type="password"
          label="Password"
          :rules="[rules.required]"
          prepend-inner-icon="mdi-key"
          autocomplete="current-password"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          block
          color="success"
          type="submit"
          :loading="getAuthenticating"
          raised
          aria-label="Login"
          x-large
          @click.prevent="login"
          >Login</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'LoginForm',
  data() {
    return {
      email: null,
      password: null,
      submissionError: null,
      rules: {
        required: (val) => !!val || 'Required',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail address.'
        }
      }
    }
  },
  computed: {
    ...mapGetters({ getAuthenticating: 'user/getAuthenticating' })
  },
  methods: {
    ...mapActions({
      userLogin: 'user/login'
    }),

    login() {
      if (this.$refs.form.validate()) {
        const { email, password } = this

        this.userLogin({ email, password })
          .then((res) => {
            this.$router.push('/app')
          })
          .catch((error) => {
            this.submissionError = error
          })
      }
    }
  }
}
</script>
