<template>
  <div>
    <nav-bar/>
    <div class="d-flex flex-column justify-content-center align-items-center">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show" class="d-flex flex-column" style="gap: 1rem">

        <b-form-group v-if="subjects && subjects.length>0" id="input-group-1" label="Предмет:" label-for="input-1">
          <b-form-select
              id="input-1"
              v-model="form.subject"
              :options="subjects"
              :text-field="'name'"
              :value-field="'id'"
              required
          >
            <template #first>
              <b-form-select-option :value="null" disabled>Выберите предмет</b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group>

        <b-form-group v-if="times && times.length>0" id="input-group-2" label="Время:" label-for="input-2">
          <b-form-select
              id="input-2"
              v-model="form.times"
              :options="times"
              required
          >
            <template #first>
              <b-form-select-option :value="null" disabled> Выберите слот</b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group>

        <b-form-group v-if="teachers && teachers.length>0" id="input-group-3" label="Учитель:" label-for="input-3">
          <b-form-select
              id="input-3"
              v-model="form.teachers"
              :options="teachers"
              :text-field="'fullName'"
              :value-field="'id'"
              required
          >
            <template #first>
              <b-form-select-option :value="null" disabled> Выберите учителя</b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group>
        <div class="d-flex" style="gap: 1rem">
          <b-button type="submit" @click="createLesson" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </div>
      </b-form>
    </div>
  </div>
</template>
<style>

</style>
<script>
import NavBar from "@/components/NavBar/NavBar";

export default {
  components: {
    NavBar
  },
  data() {
    return {
      form: {
        subject: null,
        times: null,
        teachers: null,
        checked: []
      },
      subjects: [],
      times: [],
      teachers: [],
      show: true
    }
  },
  mounted() {
    this.getSubjects()
    this.getTimeSlot()
    this.getTeachers()
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset(event) {
      event.preventDefault()
      this.form.subject = null
      this.form.time = null
      // кнопка ресет
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    async getSubjects() {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
      await this.$axios.get('/subjects/getAllSubjects', {
        headers: headers
      }).then(response => {
        if (response.status === 200) {
          this.subjects = response.data
        }
      })
    },
    async getTimeSlot() {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
      await this.$axios.get('/lesson/getAllTimeSlot', {
        headers: headers
      }).then(response => {
        if (response.status === 200) {
          this.times = response.data.map(el => el.startAt + ':00 - ' + el.endAt + ':00')
        }
      })
    },
    async getTeachers() {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
      let user = JSON.parse(localStorage.getItem('user'))
      await this.$axios.get('/main/getTeachers', {
        headers: headers,
        params: {
          instrumentId: user.instrumental.id
        }
      }).then(response => {
        if (response.status === 200) {
          this.teachers = response.data
        }
      })
    },
    createLesson() {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
      let user = JSON.parse(localStorage.getItem('user'))
      this.$axios.post('/lesson/createLesson', {
        teacherId: this.form.teachers,
        subjectId: this.form.subject,
        timeSlot: this.form.times,
        studentId: user.id
      },{
            headers: headers
          }
      ).then(response => console.log(response.data))
      this.$router.push('/main')
    }
  }
}
</script>