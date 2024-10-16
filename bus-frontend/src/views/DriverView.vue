<template>
    <div class="driver-view-container container">
        <h2 class="title is-2">{{ $t("driver.heading") }} </h2>

        <!-- Today's schedule -->
        <table class="table is-fullwidth is-striped mb-5">
            <thead>
                <tr>
                    <th>{{ $t("driver.departureTime") }}</th>
                    <th>{{ $t("driver.hospital") }}</th>
                    <th>{{ $t("driver.viewPassengers") }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="ride in rides" :key="ride.id">
                    <td>{{ formatTime(ride.departure_time) }}</td>
                    <td>{{ ride.hospital_name }}</td>
                    <td>
                        <button class="button is-light" @click="viewPassengers(ride.id)">
                            {{ $t("driver.viewButton") }}
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- Ride Details Overlay -->
        <RideDetailsOverlay v-if="selectedRide" :ride="selectedRide" @close="selectedRide = null" />
    </div>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import RideDetailsOverlay from '@/components/RideDetailsOverlay.vue';
const apiUrl = process.env.VUE_APP_BACKEND_URL

export default {
    components: {
        RideDetailsOverlay
    },
    data() {
        return {
            rides: [],
            selectedRide: null,
        };
    },
    mounted() {
        this.fetchRides();
    },
    computed: {
        // Access the auth store to get the token
        authStore() {
            return useAuthStore();
        },
    },
    methods: {
        async fetchRides() {
            try {
                const token = this.authStore.token;  // Get the token from authStore
                const response = await axios.get(`${apiUrl}/api/rides/driver_view`, {
                    headers: {
                        'Authorization': `Bearer ${token}` // Attach the JWT token
                    }

                });
                this.rides = response.data;
            } catch (error) {
                console.error('Error fetching rides:', error);
            }
        },
        async viewPassengers(rideId) {
            try {
                const token = this.authStore.token;  // Get the token from authStore
                const response = await axios.get(`${apiUrl}/api/rides/${rideId}/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.selectedRide = response.data;
            } catch (error) {
                console.error('Error fetching passengers:', error);
            }
        },
        async toggleStatus(patient) {
            try {
                const token = sessionStorage.getItem('token'); // or sessionStorage if you're using it
                const response = await axios.patch(`${apiUrl}/api/rides/${patient.id}/toggle_status/`, {
                    headers: {
                        'Authorization': `Bearer ${token}` // Attach the JWT token
                    }

                });
                patient.status = response.data.status;  // Update status in the frontend
            } catch (error) {
                console.error('Error toggling status:', error);
            }
        },
        formatTime(time) {
            return time ? time.substring(0, 5) : '';
        },
    }
};
</script>

<style scoped>
.driver-view-container {
    padding: 20px;
}

.table {
    margin-top: 20px;
}
</style>