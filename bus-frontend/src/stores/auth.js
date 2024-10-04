// stores/auth.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore({
  id: 'auth',  // Store ID

  state: () => ({
    token: sessionStorage.getItem('token') || null,  // Initialize token from sessionStorage
    isAuthenticated: !!sessionStorage.getItem('token'),  // Set isAuthenticated based on token existence
  }),

  actions: {
    // Handle login and store the JWT token
    async login(email, password) {
      try {
        const response = await axios.post('http://localhost:8000/api/token/', {
          email,
          password,
        });

        this.token = response.data.access;  // Set the JWT token in the store
        this.isAuthenticated = true;  // Mark the user as authenticated
        sessionStorage.setItem('token', this.token);  // Store token in sessionStorage
      } catch (error) {
        console.error('Login failed:', error);
        throw new Error('Login failed. Please check your credentials.');
      }
    },

    // Handle logout by clearing the token from state and sessionStorage
    logout() {
      this.token = null;  // Clear the token from the store
      this.isAuthenticated = false;  // Mark the user as logged out
      sessionStorage.removeItem('token');  // Remove token from sessionStorage
    },

    // Restore the token from sessionStorage when the app is reloaded
    restoreToken() {
      const token = sessionStorage.getItem('token');
      if (token) {
        this.token = token;  // Restore token to the store
        this.isAuthenticated = true;  // Mark the user as authenticated
      } else {
        this.isAuthenticated = false;  // Ensure it's false if no token is present
      }
    },
  },
});
