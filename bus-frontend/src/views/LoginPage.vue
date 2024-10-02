<template>
    <div class="login-container">
        <h1>Login</h1>
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
                    <button class="button is-primary" type="submit">Login</button>
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
        };
    },
    methods: {
        async loginUser() {
            try {
                const authStore = useAuthStore();
                // Trigger the login action
                await authStore.login(this.email, this.password);  // Call login() from Pinia store

                // Check if the login was successful by confirming the token is set
                if (authStore.isAuthenticated) {
                    console.log("Login successful. Redirecting to AdminDashboard.");
                    this.$router.push({ name: 'AdminDashboard' });  // Redirect on successful login
                } else {
                    this.errorMessage = 'Login failed. Please check your credentials.';
                }
            } catch (error) {
                this.errorMessage = 'Login failed. Please check your credentials.';
                console.error('Login Error:', error);
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
