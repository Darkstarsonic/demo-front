<template>

  <div class="d-flex justify-content-center flex-column align-items-center">
    <div class="w-50">
      <div class="d-flex justify-content-center">
        <span class="h3">Registration</span>
      </div>
      <div class="d-flex justify-content-center align-items-center" style="gap: 1rem">
        <label for="isTeacher">Teacher?</label>
        <b-form-checkbox
          v-model="isTeacher"
          name="isTeacher"
          :switch="true"
        />
        <input :placeholder="'Email'" type="text" v-model="email">
        <input :placeholder="'Password'" type="password" v-model="password">
        <input :placeholder="'Full Name'" type="text" v-model="fullName">
        <input :placeholder="'Instrument'" type="text" v-model="instrument">
      </div>
      <div class="d-flex justify-content-center" style="gap: 1rem">
        <nuxt-link class="btn btn-info" :to="'/'">Login</nuxt-link>
        <b-button variant="success" @click.prevent="registration">Registration</b-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      fullName: '',
      instrument: '',
      isTeacher: false,
      role: 3
    }
  },
  watch: {
    isTeacher() {
      if(this.isTeacher === true)
        this.role = 2
      else
        this.role = 3
    }
  },
  methods: {
    registration() {
      this.$axios.post('/authorization/registration', {
        email: this.email,
        password: this.password,
        fullName: this.fullName,
        instrument: this.instrument,
        role: this.role
      }).then(response => console.log(response.data))
      this.$router.push('/')
    }
  }
}
</script>
<style scoped>
body{
  background: bisque;
}
</style>