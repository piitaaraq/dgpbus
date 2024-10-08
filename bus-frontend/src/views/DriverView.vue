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
                        <button class="button is-primary" @click="viewPassengers(ride.id)">
                            {{ $t("driver.viewButton") }}
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Passenger check-off -->
        <div v-if="selectedRide">
            <h3 class="title is-4">{{ $t("driver.passengersHeading") }}</h3>
            <table class="table is-fullwidth">
                <thead>
                    <tr>
                        <th>{{ $t("driver.name") }}</th>
                        <th>{{ $t("driver.room") }}</th>
                        <th>{{ $t("driver.status") }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="patient in selectedRide.patients" :key="patient.id">
                        <td>{{ patient.name }}</td>
                        <td>{{ patient.room }}</td>
                        <td>
                            <button @click="toggleStatus(patient)">
                                {{ patient.status ? $t("driver.checkedIn") : $t("driver.notCheckedIn") }}
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            rides: [],
            selectedRide: null,
        };
    },
    mounted() {
        this.fetchRides();
    },
    methods: {
        async fetchRides() {
            try {
                const token = sessionStorage.getItem('token'); // or sessionStorage if you're using it
                const response = await axios.get('http://localhost:8000/api/rides/driver_view/', {
                    headers: {
                        'Authorization': `Bearer ${token}` // Attach the JWT token
                    }

                });
                console.log(response.data);
                this.rides = response.data;
            } catch (error) {
                console.error('Error fetching rides:', error);
            }
        },
        async viewPassengers(rideId) {
            try {
                const token = sessionStorage.getItem('token'); // or sessionStorage if you're using it
                const response = await axios.get(`http://localhost:8000/api/rides/${rideId}/`, {
                    headers: {
                        'Authorization': `Bearer ${token}` // Attach the JWT token
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
                const response = await axios.patch(`http://localhost:8000/api/rides/${patient.id}/toggle_status/`, {
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