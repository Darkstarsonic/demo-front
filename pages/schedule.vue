<template>
  <div>
    <nav-bar/>
  </div>
  <div>
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
      fields: [],
      schedule: []
    }
  },
  mounted() {
  },
  methods: {
    getLesson() {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    }
  }
}
</script>
<style>

</style>