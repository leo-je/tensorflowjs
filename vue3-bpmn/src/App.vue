<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { config } from './config'
export default defineComponent({
  name: 'App',
  components: {
  },
  mounted() {
  },
  beforeCreate() {
    let token = sessionStorage.getItem("access-user")
    let isAuth = config.isAuth
    if (!token && isAuth) {
      this.$router.push({ path: "/login" });
    } else
      this.$router.push({ path: "/" });
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
