<template>
  <main>
    <div class="signup-container">
      <h2>Sign up for CSSTrivia</h2>
      <div class="signup-name-container">
        <v-text-field
          :error-messages="firstNameInputErrorMsg"
          :error="showFirstNameError"
          :rules="[rules.required]"
          @blur="showFirstNameError = firstName === ''"
          base-color="deep-purple-lighten-1"
          bg-color="deep-purple-lighten-5"
          color="deep-purple-lighten-1"
          label="First Name"
          v-model="firstName"
          variant="outlined"
        ></v-text-field>
        <v-text-field
          :error-messages="lastNameInputErrorMsg"
          :error="showLastNameError"
          :rules="[rules.required]"
          @blur="showLastNameError = lastName === ''"
          base-color="deep-purple-lighten-1"
          bg-color="deep-purple-lighten-5"
          color="deep-purple-lighten-1"
          label="Last Name"
          v-model="lastName"
          variant="outlined"
        ></v-text-field>
      </div>
      <v-text-field
        :error-messages="usernameInputErrorMsg"
        :error="showUsernameError"
        :rules="[rules.required]"
        @blur="showUsernameError = username === ''"
        base-color="deep-purple-lighten-1"
        bg-color="deep-purple-lighten-5"
        color="deep-purple-lighten-1"
        label="Username"
        rounded="lg"
        v-model="username"
        variant="outlined"
      ></v-text-field>
      <v-text-field
        :error-messages="emailInputErrorMsg"
        :error="showEmailError"
        :rules="[rules.required]"
        @blur="showEmailError = isInvalidEmail"
        base-color="deep-purple-lighten-1"
        bg-color="deep-purple-lighten-5"
        color="deep-purple-lighten-1"
        label="Email"
        rounded="lg"
        v-model="email"
        variant="outlined"
      ></v-text-field>
      <v-text-field
        :append-inner-icon="isVisible ? 'mdi-eye-off' : 'mdi-eye'"
        :error-messages="passwordInputErrorMsg"
        :error="showPasswordError"
        :rules="[rules.required]"
        :type="isVisible ? 'text' : 'password'"
        @blur="showPasswordError = password === ''"
        @click:append-inner="isVisible = !isVisible"
        base-color="deep-purple-lighten-1"
        bg-color="deep-purple-lighten-5"
        color="deep-purple-lighten-1"
        label="Password"
        rounded="lg"
        v-model="password"
        variant="outlined"
      ></v-text-field>
      <v-btn
        :ripple="false"
        @click="handleSignUp"
        block
        class="signup-btn"
        color="deep-purple-lighten-1"
        rounded="lg"
        variant="flat"
        >Sign Up</v-btn
      >
      <RouterLink class="link" to="/login">Already have an account?</RouterLink>
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
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    isVisible: false,
    firstNameInputErrorMsg: '',
    lastNameInputErrorMsg: '',
    usernameInputErrorMsg: '',
    emailInputErrorMsg: '',
    passwordInputErrorMsg: '',
    showFirstNameError: false,
    showLastNameError: false,
    showUsernameError: false,
    showEmailError: false,
    showPasswordError: false
  }),

  computed: {
    isInvalidEmail() {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      console.log('isInvalidEmail', !emailRegex.test(this.email))
      return !emailRegex.test(this.email)
    }
  },

  watch: {
    showFirstNameError() {
      if (this.firstName === '') {
        this.firstNameInputErrorMsg = 'Field is required'
      } else {
        this.firstNameInputErrorMsg = ''
      }
    },
    showLastNameError() {
      if (this.lastName === '') {
        this.lastNameInputErrorMsg = 'Field is required'
      } else {
        this.lastNameInputErrorMsg = ''
      }
    },
    showUsernameError() {
      if (this.username === '') {
        this.usernameInputErrorMsg = 'Field is required'
      } else {
        this.showUsernameError = false
        this.usernameInputErrorMsg = ''
      }
    },
    showEmailError() {
      if (this.isInvalidEmail) {
        this.emailInputErrorMsg = 'Invalid email format'
      } else {
        this.emailInputErrorMsg = ''
      }
    },
    showPasswordError() {
      if (this.password === '') {
        this.passwordInputErrorMsg = 'Field is required'
      } else {
        this.passwordInputErrorMsg = ''
      }
    }
  },

  methods: {
    async handleSignUp() {
      if (
        this.firstName === '' ||
        this.lastName === '' ||
        this.username === '' ||
        this.password === '' ||
        this.isInvalidEmail
      ) {
        this.showFirstNameError = this.firstName === ''
        this.showLastNameError = this.lastName === ''
        this.showUsernameError = this.username === ''
        this.showEmailError = this.isInvalidEmail
        this.showPasswordError = this.password === ''
        return
      }
      const { status } = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          first_name: this.firstName,
          last_name: this.lastName,
          username: this.username,
          email: this.email,
          password: this.password
        })
      })
      if (status === 200) {
        this.$router.push('/trivias')
      } else {
        this.showUsernameError = true
        this.showEmailError = true
        this.emailInputErrorMsg = 'An account with this username or email address already exists'
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
  height: 100vh;
  justify-content: center;
}

h2 {
  color: #7e57c2;
  margin-bottom: 15px;
  text-align: center;
}

.signup-name-container {
  display: flex;
  gap: 10px;
}

.signup-container {
  max-width: 492px;
  width: calc(100% - 50px);
}

.signup-btn {
  color: #ffffff;
  height: 48px;
}

.link {
  color: #7e57c2;
  display: inline-block;
  margin-top: 13px;
  text-align: center;
  text-decoration: none;
  width: 100%;
}

.link:hover {
  color: #311b92;
}
</style>
