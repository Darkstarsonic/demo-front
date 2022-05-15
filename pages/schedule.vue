<template>
  <div>
    <nav-bar/>
    <b-table striped hover :items="schedule" :fields="fields"></b-table>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar/NavBar";

export default {
  components: {
    NavBar
  }, data() {
    return {
      table: {
        schedule: null
      },
      fields: [
        'Предмет',
        'Учитель',
        'Время'
      ],
      schedule: []
    }
  },
  mounted() {
    this.getLesson()
  },
  methods: {
    getLesson() {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
      let user = JSON.parse(localStorage.getItem('user'))
      this.$axios.get(`/lesson/schedule/${user.id}`, {
        headers: headers
      }).then(response => {
        if (response.status === 200) {
          this.schedule = response.data
        }
        console.log(response.data)
      })
    }
  }
}
</script>
<style>

</style>