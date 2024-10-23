// src/main.js

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router'; // Import the router
import { setupAxiosCsrf } from '../services/csrf'; // Import CSRF setup
import './styles/custom-bulma.css'; // Import the custom Bulma file
import gl from './locales/gl.json';
import da from './locales/da.json';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGlobe, faLanguage, faSignOutAlt, faBus, faCircleXmark, faClock, faCopyright } from '@fortawesome/free-solid-svg-icons'; // Import specific icons

const pinia = createPinia();

const i18n = createI18n({
  locale: 'gl',
  messages: {
    gl,
    da
  }
});

// Set up CSRF token for Axios requests
setupAxiosCsrf();

// Add icons to the library
library.add(faGlobe, faLanguage, faSignOutAlt, faBus, faCircleXmark, faClock, faCopyright);

const app = createApp(App)

// Register Font Awesome globally
app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router)
app.use(pinia)
app.use(i18n)

app.mount('#app')
