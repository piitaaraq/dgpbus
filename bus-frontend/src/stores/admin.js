// stores/admin.js (Pinia store for admin actions)

import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './auth';
const apiUrl = process.env.VUE_APP_BACKEND_URL

export const useAdminStore = defineStore('admin', {
    state: () => ({
        pendingUsers: [],
    }),
    actions: {
        async fetchPendingUsers() {
            const authStore = useAuthStore();
            try {
                const response = await axios.get(`${apiUrl}/api/approve-users/`, {
                    headers: {
                        Authorization: `Bearer ${authStore.token}`,
                    },
                });
                this.pendingUsers = response.data;  // Store pending users
            } catch (error) {
                throw new Error('Failed to fetch pending users.');
            }
        },
        async approveUser(userId) {
            const authStore = useAuthStore();
            try {
                await axios.post(`${apiUrl}/api/approve-users/${userId}/`, null, {
                    headers: {
                        Authorization: `Bearer ${authStore.token}`,
                    },
                });
                // Remove the approved user from the list of pending users
                this.pendingUsers = this.pendingUsers.filter(user => user.id !== userId);
            } catch (error) {
                throw new Error('Failed to approve user.');
            }
        },
    },
});
