<template>
  <div id="app" class="app-layout">
    <HeaderBar class="has-background-primary" />
    <BreadCrumb class="pt-3" />
    <div class="content">
      <router-view class=""></router-view>
    </div>
    <SiteFooter />
  </div>
</template>

<script>
import HeaderBar from './components/HeaderBar.vue';
import SiteFooter from './components/SiteFooter.vue';
import BreadCrumb from './components/BreadCrumb.vue';
export default {
  name: 'App',
  components: {
    HeaderBar,
    SiteFooter,
    BreadCrumb
  }
};
</script>

<style>
.title {
  font-family: 'Poppins', sans-serif;
}


.body {
  font-family: 'Roboto', sans-serif;
  color: #2C3E50;
  background-color: #ECF0F1;
}


.table {
  background-color: #ECF0F1;
}
</style>
