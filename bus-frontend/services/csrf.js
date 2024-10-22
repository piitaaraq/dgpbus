// src/services/csrf.js

import axios from 'axios';

// Function to get the CSRF token from cookies
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// Set CSRF token on Axios
export function setupAxiosCsrf() {
  const csrfToken = getCookie('csrftoken'); // Django's default CSRF token name is 'csrftoken'

  axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  axios.defaults.xsrfCookieName = 'csrftoken';
  if (csrfToken) {
    axios.defaults.headers.common['X-CSRFToken'] = csrfToken;
  }
}
