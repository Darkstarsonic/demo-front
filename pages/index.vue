<template class="login-body">
  <div class="d-flex justify-content-center flex-column align-items-center">
    <div class="w-50">
      <div class="d-flex justify-content-center">
        <span class="h3">Login</span>
      </div>
      <div class="d-flex justify-content-center align-items-center flex-column">
        <input :placeholder="'Email'" type="text" v-model="email">
        <input :placeholder="'Password'" type="password" v-model="password">
      </div>
      <div class="d-flex justify-content-center" style="gap: 1rem">
        <nuxt-link class="btn btn-info" :to="'/registration'">Registration</nuxt-link>
        <b-button variant="success" @click.prevent="login">Login</b-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      this.$axios.post('/authorization/login', {
        email: this.email,
        password: this.password
      }).then(response => {localStorage.setItem('jwt', response.data)
      this.getUserProfile(response.data)})
    },
    getUserProfile(jwt) {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      }
      this.$axios.post('/main/getUserProfile', {
        jwt: jwt
      }, {
        headers: headers
      }).then(response => {
        if(response.status === 200) {
          localStorage.setItem('user', JSON.stringify(response.data))
          this.$router.push('/main')
        }
      })
    }
  }
}
</script>
<style scoped>
.login-body {
  background: bisque;
  height: 100%;
}
</style>