<template>
  <div class="main-body">
    <nav-bar/>
    <div class="d-flex justify-content-center align-items-center">
      <span class="h3">Главная страница</span>
    </div>
    <div class="d-flex flex-column  justify-content-center align-items-center">
      <div class="w-75">
        <div class="text-indent"> Это главная страница музыкальной школы,приветствуем вас.
        В данной школе при регистрации вы выбрали инструмент, дальше вы сами можете подстроить расписание,
        в какое удобно вам время.
        Если хотите увидеть инструменты перейдите во вкладку инструменты,
        если вы хотите увидеть какие предметы есть и что они означают,
        то перейдите во вкладку предметы
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar/NavBar";

export default {
  components: {
    NavBar
  },
  watch: {

  },
  methods: {

  }
}
</script>
<style>
.main-body {
  background-image: url("./static/img/kindpng_2461153.png");
  background-repeat: no-repeat;
  background-position: right bottom;
  height: 100%;
}

</style>