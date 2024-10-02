<template>
  <div id="app" class="app-layout">
    <HeaderBar />
    <BreadCrumb /> <!-- Global breadcrumb component beneath the header -->
    <div class="content">
      <router-view></router-view> <!-- This is where the routed components will be displayed -->

    </div>
  </div>
</template>

<script>
import HeaderBar from './components/HeaderBar.vue';
import BreadCrumb from './components/BreadCrumb.vue';
export default {
  name: 'App',
  components: {
    HeaderBar,
    BreadCrumb
  }
};
</script>

<style>
.title {
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
}

.body {
  font-family: 'Roboto', sans-serif;
}
</style>
