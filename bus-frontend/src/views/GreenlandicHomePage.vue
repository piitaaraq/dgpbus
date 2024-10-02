<template>
  <div class="container">
    <h1 class="is-size-1">{{ $t('hospitals.whereto') }} </h1> <!-- Welcome in Kalaallisut -->
    <HospitalList />
  </div>
</template>

<script>
import HospitalList from '@/views/HospitalList.vue';

export default {
  name: 'GreenlandicHomePage',
  components: {
    HospitalList,
  }
};
</script>

<style scoped>
/* Add your styles here for the Greenlandic home page */
.container {
  padding: 1rem;
  overflow-y: auto;
}
</style>
