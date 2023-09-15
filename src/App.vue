<template>
  <div id="app">
    <NavHeader />
    <router-view></router-view>
    <AppFooter />
  </div>
</template>

<script>

import NavHeader from "@/components/views/NavHeader";
import AppFooter from "@/components/views/AppFooter";
export default {
  name: 'App',
  components: {NavHeader, AppFooter},
  mounted(){
    this.$store.dispatch("getProducts");
  }
};
</script>