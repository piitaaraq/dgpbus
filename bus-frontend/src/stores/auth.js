import { defineStore } from 'pinia';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';  
import Cookies from 'js-cookie';     
const apiUrl = process.env.VUE_APP_BACKEND_URL

export const useAuthStore = defineStore({
  id: 'auth',

  state: () => ({
    token: Cookies.get('auth_token') || null,  // Initialize token from cookies
    isAuthenticated: !!Cookies.get('auth_token'),  // Set isAuthenticated based on token existence
  }),

  actions: {
    // Handle login and store the JWT token
    async login(email, password) {
      try {
        const response = await axios.post(`${apiUrl}/api/token/`, {
          email,
          password,
        });

        this.token = response.data.access;  
        this.isAuthenticated = true;  
        Cookies.set('auth_token', this.token, { expires: 7 });  
      } catch (error) {
        throw new Error('Login failed. Please check your credentials.');
      }
    },

    // Handle logout by clearing the token from state and cookies
    logout() {
      this.token = null;  
      this.isAuthenticated = false;  
      Cookies.remove('auth_token');  
    },

    // Restore the token from cookies when the app is reloaded
    restoreToken() {
      const token = Cookies.get('auth_token');
      if (token) {

        if (this.isTokenExpired(token)) {
          // If token is expired, logout the user
          this.logout();
        } else {
          this.token = token;  
          this.isAuthenticated = true;  
        }
      } else {
        this.isAuthenticated = false;  
      }
    },

    // Function to check if the token is expired
    isTokenExpired(token) {
      try {
        const decoded = jwtDecode(token);  // Use correct named import
        const now = Math.floor(Date.now() / 1000);  // Current time in seconds
        return decoded.exp < now;  // Token is expired if the expiration time is in the past
      } catch (error) {
        console.error('Failed to decode token or check expiration:', error);
        return true;  // Consider token expired if decoding fails
      }
    },

    // Optionally: Use this method to validate token with backend if needed
    async validateTokenWithBackend() {
      try {
        const token = Cookies.get('auth_token');
        const response = await axios.post(`${apiUrl}/api/token/verify`, { token });
        return response.status === 200;  // Return true if the token is valid
      } catch (error) {
        this.logout();  // Logout if the token is invalid
        return false;
      }
    },
  },
});
