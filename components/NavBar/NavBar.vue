<template>
  <b-navbar class="justify-content-center" type="dark" variant="dark">
    <b-nav-item href="/main">Основная</b-nav-item>
    <b-nav-item v-if="(user && user.role) && (user.role.id === 3 || user.role.id === 1)" href="/createSchedule">Создать расписание</b-nav-item>
    <b-nav-item href="/schedule">Расписание</b-nav-item>
    <b-nav-item-dropdown text="Info" right>
      <b-dropdown-item href="/instrument">Инструмент</b-dropdown-item>
      <b-dropdown-item href="/subjects">Предметы</b-dropdown-item>
    </b-nav-item-dropdown>
    <b-nav-item-dropdown v-if="user" class="nav-right" :text="user.fullName" right>
      <b-dropdown-item @click="logout">Выйти</b-dropdown-item>
    </b-nav-item-dropdown>
  </b-navbar>
</template>

<script>
export default {
  name: "NavBar",
  data () {
    return {
      user: null
    }
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem('user'))
  },
  methods:{
    logout(){
      localStorage.removeItem('jwt')
      localStorage.removeItem('user')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.nav-right {
  margin-left: auto;
}
</style>