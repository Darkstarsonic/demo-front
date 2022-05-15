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
        <b-form>
          <b-form-select
              id="input-1"
              v-model="form.instrument"
              :options="instrument"
              :text-field="'name'"
              :value-field="'id'"
              required
          >
            <template #first>
              <b-form-select-option :value="null" disabled>Выберите Инструмент</b-form-select-option>
            </template>
          </b-form-select>
        </b-form>
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
      form: {
        instrument: null,
        checked: []
      },
      email: '',
      password: '',
      fullName: '',
      instrument: [],
      isTeacher: false,
      role: 3,
      show: true
    }
  },
  mounted() {
    this.getInstrument()
  },
  watch: {
    isTeacher() {
      if (this.isTeacher === true)
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
    },
    async getInstrument() {
      const headers = {
        'Content-Type': 'application/json'
      }
      await this.$axios.get('/instrument/getAllInstruments', {
        headers: headers
      }).then(response => {
        if (response.status === 200) {
          this.instrument = response.data
        }
      })
    },
  }
}
</script>
<style scoped>

</style>