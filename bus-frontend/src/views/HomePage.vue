<template>
  <div class="homepage-container container">
    <div class="home-cards">
      <div class="card" @click="goToStaffArea">
        <h2 class="title is-3">{{ $t('homepage.staffTitle') }}</h2>
      </div>

      <div class="card" @click="goToPatientArea">
        <h2 class="title is-3">{{ $t('homepage.patientTitle') }}</h2>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
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
  justify-content: center;
  align-items: center;
  height: 80vh;
  /* Adjust to avoid scrollbar */
}

.home-cards {
  display: flex;
  flex-direction: row;
  /* Cards side by side on larger screens */
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
  background-color: #f4f4f4;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.card:hover {
  background-color: #e0e0e0;
}

.title {
  margin: 2rem;
}

/* Media Queries for Responsive Design */
@media (max-width: 768px) {
  .home-cards {
    flex-direction: column;
    /* Stack cards vertically on smaller screens */
  }

  .card {
    width: 100%;
    /* Cards take full width on smaller screens */
    max-width: 300px;
    /* Optional: limit max width if needed */
  }
}

@media (max-width: 480px) {

  .card {
    min-width: 200px;
    /* Further reduce card width for smaller screens */
    height: 150px;
  }
}
</style>
