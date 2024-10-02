// stores/auth.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore({
  id: 'auth',  // Store ID

  state: () => ({
    token: localStorage.getItem('token') || null,  // Initialize token from localStorage
    isAuthenticated: !!localStorage.getItem('token'),  // Set isAuthenticated based on token existence
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
        localStorage.setItem('token', this.token);  // Store token in localStorage
      } catch (error) {
        console.error('Login failed:', error);
        throw new Error('Login failed. Please check your credentials.');
      }
    },

    // Handle logout by clearing the token from state and localStorage
    logout() {
      this.token = null;  // Clear the token from the store
      this.isAuthenticated = false;  // Mark the user as logged out
      localStorage.removeItem('token');  // Remove token from localStorage
    },

    // Restore the token from localStorage when the app is reloaded
    restoreToken() {
      const token = localStorage.getItem('token');
      if (token) {
        this.token = token;  // Restore token to the store
        this.isAuthenticated = true;  // Mark the user as authenticated
      } else {
        this.isAuthenticated = false;  // Ensure it's false if no token is present
      }
    },
  },
});
