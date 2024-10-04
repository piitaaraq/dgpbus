<template>
  <nav class="navbar pb-3" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <!-- Logo -->
      <router-link to="/" class="navbar-item">
        <img src="@/assets/logo.png" alt="Logo" class="logo">
      </router-link>

      <!-- Burger icon for mobile -->
      <a role="button" class="navbar-burger" :class="{ 'is-active': isActive }" @click="toggleMenu" aria-label="menu"
        aria-expanded="false">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <!-- Navbar menu -->
    <div :class="{ 'is-active': isActive }" class="navbar-menu">
      <!-- Navbar start (left side) -->
      <div class="navbar-start">
      </div>

      <!-- Navbar end (right side) -->
      <div class="navbar-end">
        <button class="button is-light bus-icon" @click="toRegistration">
          <font-awesome-icon :icon="['fas', 'bus']" />
          Bestil kørsel
        </button>
        <!-- Language selection as a dropdown using Bulma's has-dropdown class -->
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            <font-awesome-icon :icon="['fas', 'language']" /> <!-- Language icon -->
          </a>
          <div class="navbar-dropdown is-right">
            <a class="navbar-item" @click="setLanguage('gl')">Kalaallisut</a>
            <a class="navbar-item" @click="setLanguage('da')">Dansk</a>
          </div>
        </div>

        <!-- Show logout button only if the user is authenticated -->
        <div class="navbar-item" v-if="isAuthenticated">
          <button class="button is-light" @click="handleLogout">
            <font-awesome-icon :icon="['fas', 'sign-out-alt']" class="logout-icon" />
            {{ $t('headerbar.logout') }}
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'; // Import FontAwesome

export default {
  components: {
    FontAwesomeIcon, // Register FontAwesome component
  },
  data() {
    return {
      isActive: false,
      currentLanguage: this.$i18n.locale, // Track the current language
    };
  },
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
    toRegistration() {
      this.$router.push({ name: 'HospitalList' });
    },
    setLanguage(lang) {
      this.$i18n.locale = lang;
      this.currentLanguage = lang;
    },
    toggleMenu() {
      this.isActive = !this.isActive;
    },
  },
};
</script>

<style scoped>
/* Logo Styling */
.logo {
  max-height: 50px;
}

/* Additional styling as necessary */
.language-button.is-active {
  color: #00A5CF;
}

/* Burger active state styling */
.navbar-burger.is-active span {
  background-color: #00A5CF;
}

.logout-icon {
  margin-right: 0.5rem;
}

.bus-icon {
  margin-right: 0.5rem;
}
</style>
