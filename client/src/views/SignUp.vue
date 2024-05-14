<template>
  <main>
    <div class="login-container">
      <h2>Sign up for CSSTrivia</h2>
      <v-text-field
        class="login-input"
        label="Username"
        variant="outlined"
        :rules="[rules.required]"
        color="deep-purple-lighten-1"
        base-color="deep-purple-lighten-1"
        bg-color="deep-purple-lighten-5"
      ></v-text-field>
      <v-text-field
        class="login-input"
        label="Password"
        type="password"
        variant="outlined"
        :rules="[rules.required]"
        color="deep-purple-lighten-1"
        base-color="deep-purple-lighten-1"
        bg-color="deep-purple-lighten-5"
      ></v-text-field>
      <v-btn
        class="login-btn"
        variant="flat"
        rounded="lg"
        :ripple="false"
        color="deep-purple-lighten-1"
        block
        >Login</v-btn
      >
    </div>
  </main>
</template>

<script>
export default {
  data: () => ({
    rules: {
      required: (value) => !!value || 'Field is required'
    }
  })
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

.login-input {
}

.login-btn {
  color: #ffffff;
  height: 48px;
}
</style>
