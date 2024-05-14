<template>
  <main>
    <div class="login-container">
      <h2>Login to CSSTrivia</h2>
      <v-text-field
        v-model="username"
        class="login-input"
        label="Username"
        variant="outlined"
        :rules="[rules.required]"
        :error="showUsernameError"
        :error-messages="usernameInputErrorMsg"
        color="deep-purple-lighten-1"
        base-color="deep-purple-lighten-1"
        bg-color="deep-purple-lighten-5"
        rounded="lg"
      ></v-text-field>
      <v-text-field
        class="login-input"
        label="Password"
        v-model="password"
        :type="isVisible ? 'text' : 'password'"
        variant="outlined"
        :append-inner-icon="isVisible ? 'mdi-eye-off' : 'mdi-eye'"
        :rules="[rules.required]"
        @click:append-inner="isVisible = !isVisible"
        :error="showPasswordError"
        :error-messages="passwordInputErrorMsg"
        color="deep-purple-lighten-1"
        base-color="deep-purple-lighten-1"
        bg-color="deep-purple-lighten-5"
        rounded="lg"
      ></v-text-field>
      <v-btn
        class="login-btn"
        variant="flat"
        rounded="lg"
        :ripple="false"
        color="deep-purple-lighten-1"
        block
        @click="handleLogin"
        >Login</v-btn
      >
      <div class="login-link-container">
        <RouterLink class="link" to="/signup">Create an Account</RouterLink>
        <RouterLink class="link" to="/reset">Forgot Password?</RouterLink>
      </div>
    </div>
  </main>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  components: {
    RouterLink
  },
  data: () => ({
    rules: {
      required: (value) => !!value || 'Field is required'
    },
    username: '',
    password: '',
    showPasswordError: false,
    showUsernameError: false,
    passwordInputErrorMsg: '',
    usernameInputErrorMsg: '',
    isVisible: false
  }),
  methods: {
    async handleLogin() {
      if (this.username === '' || this.password === '') {
        this.showUsernameError = this.username === ''
        this.showPasswordError = this.password === ''
        this.passwordInputErrorMsg = 'Field is required'
        this.usernameInputErrorMsg = 'Field is required'
        return
      }
      const { status } = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: this.username, password: this.password })
      })
      if (status === 200) {
        this.$router.push('/trivias')
      } else {
        this.showPasswordError = true
        this.showUsernameError = true
        this.passwordInputErrorMsg = 'Invalid username or password'
      }
    }
  }
}
</script>

<style scoped>
:global(.v-field__field) {
  color: #311b92 !important;
}

:global(.v-input__details) {
  padding-bottom: 10px;
}

main {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
}

h2 {
  margin-bottom: 15px;
  text-align: center;
  color: #7e57c2;
}

.login-container {
  max-width: 492px;
  width: calc(100% - 50px);
}

.login-btn {
  color: #ffffff;
  height: 48px;
}

.login-link-container {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.link {
  text-decoration: none;
  color: #7e57c2;
}

.link:hover {
  color: #311b92;
}
</style>
