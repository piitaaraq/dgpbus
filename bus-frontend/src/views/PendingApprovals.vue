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
            const response = await axios.get('http://localhost:8000/api/approve-users/', {
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
        async approveUser(userId) {
            try {
                const authStore = useAuthStore();
                await axios.post('http://localhost:8000/api/approve-users/${userId}/', null, {
                    headers: {
                        Authorization: `Bearer ${authStore.token}`,
                    },
                });
                this.pendingUsers = this.pendingUsers.filter(user => user.id !== userId);  // Remove approved user from the list
            } catch (error) {
                this.errorMessage = 'Failed to approve user.';
            }
        },
    },
};
</script>
