<template>
  <div class="homepage-container container">
    <h1 class="title is-1 is-size-3-mobile has-text-centered">{{ $t("homepage.heading") }} </h1>
    <div class="home-cards">
      <div class="card" @click="goToStaffArea">
        <h3 class="title is-3 is-size-4-mobile has-text-success">{{ $t('homepage.staffTitle') }}</h3>
      </div>

      <div class="card" @click="goToPatientArea">
        <h3 class="title is-3 is-size-4-mobile has-text-success">{{ $t('homepage.patientTitle') }}</h3>
      </div>

    </div>
    <CookieConsent />

  </div>
</template>

<script>
import CookieConsent from '@/components/CookieConsent.vue';

export default {
  name: 'HomePage',
  components: {
    CookieConsent,
  },
  methods: {
    goToStaffArea() {
      this.$router.push({ name: 'AdminDashboard' });
    },
    goToPatientArea() {
      this.$router.push({ name: 'HospitalList' });
    }
  }
};
</script>

<style scoped>
.homepage-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.home-cards {
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: center;
  align-items: stretch;
}

.card {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 250px;
  height: 170px;
  cursor: pointer;
  border-radius: 8px;
  transition: border-color 0.2s;
  background-color: #34495E;
}

.card:hover {
  background-color: #2C3E50;
}

.title {
  margin: 2rem;
  font-weight: 400;
}


/* Media Queries for Responsive Design */
@media (max-width: 768px) {
  .home-cards {
    flex-direction: column;
    /* Stack cards vertically on smaller screens */
  }

  .card {
    width: 100%;
    max-width: 300px;
  }
}

@media (max-width: 480px) {
  .card {
    min-width: 200px;
    height: 150px;
  }
}
</style>
