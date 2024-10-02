// src/main.js

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router'; // Import the router
import './styles/custom-bulma.css'; // Import the custom Bulma file
import gl from './locales/gl.json';
import da from './locales/da.json';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGlobe, faLanguage, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Import specific icons

const pinia = createPinia();

const i18n = createI18n({
  locale: 'gl',
  messages: {
    gl,
    da
  }
});

// Add icons to the library
library.add(faGlobe, faLanguage, faSignOutAlt);

const app = createApp(App)

// Register Font Awesome globally
app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router)
app.use(pinia)
app.use(i18n)

app.mount('#app')