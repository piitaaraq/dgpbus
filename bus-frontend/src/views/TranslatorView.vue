<template>
    <div class="translator-view-container container">
        <h2>Patienter med behov for tolk</h2>

        <!-- Loop through each group of patients based on hospital -->
        <div v-for="(patients, hospital) in groupedPatients" :key="hospital" class="hospital-section">
            <h3 class="hospital-title">{{ hospital }}</h3>
            <table class="table is-fullwidth">
                <thead>
                    <tr>
                        <th>{{ $t("confirm.bustime") }}</th>
                        <th>{{ $t("confirm.name") }}</th>
                        <th>{{ $t("confirm.phone") }}</th>
                        <th>{{ $t("confirm.appDate") }}</th>
                        <th>{{ $t("confirm.appTime") }}</th>
                        <th>{{ $t("confirm.department") }}</th>
                        <th>{{ $t("confirm.desc") }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="patient in sortedPatients(patients)" :key="patient.id">
                        <td>{{ formatTime(patient.bus_time) || '-' }}</td>
                        <td>{{ patient.name }}</td>
                        <td>{{ patient.phone_no }}</td>
                        <td>{{ formatDate(patient.appointment_date) }}</td>
                        <td>{{ formatTime(patient.appointment_time) }}</td>
                        <td>{{ patient.department }}</td>
                        <td>{{ patient.description }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
const apiUrl = process.env.VUE_APP_BACKEND_URL

export default {
    data() {
        return {
            patients: []
        };
    },
    computed: {
        authStore() {
            return useAuthStore();
        },

        // Group patients by hospital_name
        groupedPatients() {
            return this.patients.reduce((groups, patient) => {
                const hospitalName = patient.hospital_name;
                if (!groups[hospitalName]) {
                    groups[hospitalName] = [];
                }
                groups[hospitalName].push(patient);
                return groups;
            }, {});
        }
    },
    methods: {
        // Format date to dd/mm/yyyy
        formatDate(dateString) {
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        },

        // Format time to hh:mm
        formatTime(timeString) {
            if (!timeString) {
                return '-';
            }
            const time = new Date(`1970-01-01T${timeString}`);
            const hours = String(time.getHours()).padStart(2, '0');
            const minutes = String(time.getMinutes()).padStart(2, '0');
            return `${hours}:${minutes}`;
        },

        // Sort patients by appointment_date first, then appointment_time
        sortedPatients(patients) {
            return [...patients].sort((a, b) => {
                const dateA = new Date(a.appointment_date);
                const dateB = new Date(b.appointment_date);

                if (dateA - dateB !== 0) {
                    return dateA - dateB; // Sort by date first
                }

                const timeA = new Date(`1970-01-01T${a.appointment_time}`);
                const timeB = new Date(`1970-01-01T${b.appointment_time}`);
                return timeA - timeB; // If dates are equal, sort by time
            });
        },

        async fetchPatients() {
            try {
                const token = this.authStore.token;  // Get the token from authStore
                if (token) {
                    const response = await axios.get(`${apiUrl}/api/patients/translator-view/`, {
                        headers: {
                            'Authorization': `Bearer ${token}` // Attach the JWT token
                        }
                    });
                    this.patients = response.data;
                } else {
                    console.error('No token found. Cannot fetch patients.');
                }
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        },
    },
    mounted() {
        this.fetchPatients();
    }
};
</script>

<style scoped>
.translator-view-container {
    padding: 20px;
}

.hospital-section {
    margin-bottom: 30px;
}

.hospital-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 10px;
}

.table {
    margin-top: 10px;
}
</style>
