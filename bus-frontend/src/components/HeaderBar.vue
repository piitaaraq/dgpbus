<template>
  <nav class="navbar is-flex is-align-items-center mb-4" role="navigation" aria-label="main navigation">

    <div class="navbar-end">
      <div class="navbar-item">
        <router-link to="/" class="navbar-item">
          <div class="header-logo">
            <img src="@/assets/logo.png" alt="Logo" class="logo">
          </div>
        </router-link>
      </div>
      <div class="actions-container">
        <div class="navbar-item">
          <div class="language-selector is-flex is-align-items-center">
            <font-awesome-icon :icon="['fas', 'globe']" class="icon m-1" />
            <select @change="changeLanguage($event)" class="language-select">
              <option value="gl">Kalaallisut</option>
              <option value="da">Dansk</option>
            </select>
          </div>
        </div>

        <!-- Show logout button only if the user is authenticated -->
        <div class="navbar-item" v-if="isAuthenticated">
          <button class="logout-button" @click="handleLogout">
            <font-awesome-icon :icon="['fas', 'sign-out-alt']" class="logout-icon" />
            {{ $t('headerbar.logout') }}
          </button>
        </div>

      </div>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from '@/stores/auth';  // Import the Pinia auth store

export default {
  name: 'HeaderBar',


  computed: {
    isAuthenticated() {
      const authStore = useAuthStore();
      return authStore.isAuthenticated;
    },
  },

  methods: {
    handleLogout() {
      const authStore = useAuthStore();
      authStore.logout();
      this.$router.push({ name: 'LoginPage' });
    },

    changeLanguage(event) {
      this.$i18n.locale = event.target.value;
    },

    toggleMenu() {
      this.isActive = !this.isActive; // Toggle the burger menu
    },
  },

  mounted() {
    const authStore = useAuthStore();
    authStore.restoreToken();
  },
};
</script>

<style scoped>
/* Navbar and item styling */
.navbar {
  padding: 1rem;
}

.navbar-end {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
}

.navbar-item:hover {
  background-color: transparent;
  /* Remove background highlight on hover */
  box-shadow: none;
  /* Remove any box-shadow on hover */
}

.logo {
  max-height: 50px;
  margin-right: 1rem;
}

/* Actions container for language selector and logout button */
.actions-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}

.language-select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.logout-button {
  background-color: #f4f4f4;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.logout-button:hover {
  background-color: #e0e0e0;
}

/* Center items on smaller screens without stacking */
@media (max-width: 768px) {
  .navbar-end {
    justify-content: center;
    /* Center items horizontally */
    flex-wrap: wrap;
    /* Ensure items wrap if needed, but don't stack by default */
  }

  .navbar-item {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    /* Control the spacing between items to avoid stacking */
  }

  .logo {
    margin-right: 0.5rem;
    /* Reduce margin to keep everything in one line */
  }
}
</style>
