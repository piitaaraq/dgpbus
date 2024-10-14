<template>
    <div class="login-container">
        <h1 class="title is-4">Login</h1>
        <form @submit.prevent="loginUser">
            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input type="text" v-model="email" class="input" required />
                </div>
            </div>
            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                    <input type="password" v-model="password" class="input" required />
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <button class="button is-primary" type="submit" :class="{ 'is-loading': loading }"
                        :disabled="loading">
                        Login
                    </button>
                </div>
            </div>
            <div>
                <p>
                    <router-link to="/registrer">Registrer</router-link> dig som bruger hvis du ikke er oprettet endnu.
                </p>
            </div>
            <p v-if="errorMessage" class="has-text-danger">{{ errorMessage }}</p>
        </form>
    </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';  // Import the Pinia auth store

export default {
    data() {
        return {
            email: '',
            password: '',
            errorMessage: '',
            loading: false,  // Loader state
        };
    },
    methods: {
        async loginUser() {
            this.loading = true;  // Show loader
            this.errorMessage = '';  // Reset error message

            try {
                const authStore = useAuthStore();
                // Trigger the login action
                await authStore.login(this.email, this.password);

                // Delay redirection to make sure token is set
                setTimeout(() => {
                    if (authStore.isAuthenticated) {
                        this.$router.push({ name: 'AdminDashboard' });  // Redirect on successful login
                    } else {
                        this.errorMessage = 'Login failed. Please check your credentials.';
                    }
                }, 500);  // Adding a slight delay to ensure token setting
            } catch (error) {
                this.errorMessage = 'Login failed. Please check your credentials.';
                console.error('Login Error:', error);
            } finally {
                this.loading = false;  // Hide loader
            }
        },
    },
};
</script>

<style scoped>
.login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
}
</style>
