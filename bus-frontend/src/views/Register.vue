<template>
    <div class="create-user-container">
        <h1 class="title">Registrer ny bruger</h1>
        <form @submit.prevent="registerUser">
            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input type="email" v-model="email" class="input" required />
                </div>
            </div>
            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                    <input type="password" v-model="password" class="input" required />
                </div>
            </div>
            <div class="field">
                <label class="label">Bekræft Password</label>
                <div class="control">
                    <input type="password" v-model="confirmPassword" class="input" required />
                </div>
            </div>
            <div class="field">
                <label class="label">Rolle</label>
                <div class="control">
                    <div class="select">
                        <select v-model="role" required>
                            <option value="staff">Staff</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <button class="button is-primary" type="submit">Registrer</button>
                </div>
            </div>
            <div v-if="errorMessage" class="notification is-warning">
                <button @click="goHome" class="delete"></button>
                {{ errorMessage }}
            </div>
            <div v-if="successMessage" class="notification">
                <button @click="goHome" class="delete"></button>
                {{ successMessage }}
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
const apiUrl = process.env.VUE_APP_BACKEND_URL

export default {
    name: "RegisterUser",
    data() {
        return {
            email: '',
            password: '',
            confirmPassword: '',
            role: 'staff',  // Default role
            errorMessage: '',
            successMessage: '',
        };
    },
    methods: {
        goHome() {
            this.$router.push({ name: 'HomePage' });
        },
        async registerUser() {
            if (this.password !== this.confirmPassword) {
                this.errorMessage = 'Passwords du har indtastet matcher ikke.';
                return;
            }

            try {
                await axios.post(`${apiUrl}/api/register/`, {
                    email: this.email,
                    password: this.password,
                    role: this.role,
                });

                this.successMessage = 'Brugeren er oprettet. Vent på godkendelse fra administrator.';
                this.errorMessage = ''; // Clear error message
            } catch (error) {
                this.errorMessage = 'Der var en fejl ved brugeroprettelse. Prøv venligst igen.';
                this.successMessage = ''; // Clear success message
            }
        },
    },
};
</script>

<style scoped>
.create-user-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
}

.title {
    text-align: center;
}

.has-text-danger {
    color: #ff3860;
}

.has-text-success {
    color: #23d160;
}
</style>
