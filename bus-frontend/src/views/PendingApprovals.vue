<template>
    <div class="pending-approvals container mt-3">
        <h1 class=" title is-1">Venter på godkendelse</h1>
        <ul>
            <li v-for="user in pendingUsers" :key="user.id">
                {{ user.email }}
                <button @click="approveUser(user.id)">Godkend</button>
            </li>
        </ul>
        <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
const apiUrl = process.env.VUE_APP_BACKEND_URL

export default {
    data() {
        return {
            pendingUsers: [],
            errorMessage: '',
        };
    },
    async created() {
        try {
            const authStore = useAuthStore();
            const response = await axios.get(`${apiUrl}/api/approve-users/`, {
                headers: {
                    Authorization: `Bearer ${authStore.token}`,
                },
            });
            this.pendingUsers = response.data;
        } catch (error) {
            this.errorMessage = 'Failed to load pending users.';
        }
    },
    methods: {
        async approveUser(staffId) {  // Change the parameter name to staffId
            try {
                const authStore = useAuthStore();
                await axios.post(`${apiUrl}/api/approve-users/${staffId}/`, null, {  // Use backticks for template literals
                    headers: {
                        Authorization: `Bearer ${authStore.token}`,
                    },
                });
                this.pendingUsers = this.pendingUsers.filter(user => user.id !== staffId);  // Update filter to match staffId
            } catch (error) {
                this.errorMessage = 'Failed to approve user.';
            }
        },
    },

};
</script>
