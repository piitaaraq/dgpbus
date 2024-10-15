<template>
  <nav class="navbar " role="navigation" aria-label="main navigation">
    <div class="navbar-brand ">
      <a class="navbar-item heading is-size-1 has-text-primary-light" @click="goHome">
        Patientkørsel
      </a>
      <!-- Logo -->
      <!-- <router-link to="/" class="navbar-item">
        <img src="@/assets/logo.png" alt="Logo" class="logo">
      </router-link> -->

      <!-- Burger icon for mobile -->
      <a role="button" class="navbar-burger" :class="{ 'is-active': isActive }" @click="toggleMenu" aria-label="menu"
        aria-expanded="false">
        <span aria-hidden="true"></span>
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
        <!-- Language selection as a dropdown using Bulma's has-dropdown class -->
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link has-text-primary-light">
            <font-awesome-icon :icon="['fas', 'globe']" class="icons" />ka/da <!-- Language icon -->
          </a>
          <div class="navbar-dropdown is-right">
            <a class="navbar-item has-background-primary has-text-primary-light"
              @click="setLanguage('gl')">Kalaallisut</a>
            <a class="navbar-item has-background-primary has-text-primary-light " @click="setLanguage('da')">Dansk</a>
          </div>
        </div>
        <a class="navbar-item has-text-primary-light" @click="toRegistration">
          <font-awesome-icon :icon="['fas', 'bus']" class="icons" />
          {{ $t("headerbar.newRide") }}
        </a>
        <a class="navbar-item has-text-primary-light" @click="toRides">
          <font-awesome-icon :icon="['fas', 'clock']" class="icons" />
          {{ $t("headerbar.showRides") }}
        </a>

        <!-- Show logout button only if the user is authenticated -->
        <a class="navbar-item is-small has-text-primary-light" v-if="isAuthenticated" @click="handleLogout">
          <font-awesome-icon :icon="['fas', 'sign-out-alt']" class="icons" />
          {{ $t('headerbar.logout') }}
        </a>
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
    goHome() {
      this.$router.push({ name: 'HomePage' });
    },
    toRegistration() {
      this.$router.push({ name: 'HospitalList' });
    },
    toRides() {
      this.$router.push({ name: 'RidesTodayLong' });
    },
    setLanguage(lang) {
      this.$i18n.locale = lang;
      this.currentLanguage = lang;
    },
    toggleMenu() {
      this.isActive = !this.isActive;
    },
  },
  mounted() {
    const authStore = useAuthStore();
    authStore.restoreToken(); // Restore the token when the component is mounted
  },
};
</script>

<style scoped>
/* Logo Styling */
.logo {
  max-height: 50px;
}

a:hover {
  background-color: #34495E;
}

.button {
  background-color: #34495E;
}

.button:hover {
  background-color: #2C3E50;

}

/* Additional styling as necessary */
.language-button.is-active {
  color: #2C3E50;
}

.language-button:hover {
  color: #2C3E50;
}


.navbar-dropdown {
  background-color: #34495E;
}

/* Burger active state styling */
.navbar-burger.is-active span {
  background-color: #2C3E50;
}

.icons {
  margin-right: 0.5rem;
}

.bus-icon {
  margin-right: 0.5rem;
}


.heading {
  font-family: 'Poppins';
  font-weight: 200;
}
</style>
