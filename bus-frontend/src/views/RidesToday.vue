<template>
    <div class="rides-today-container container">
        <h2 class="title is-2">{{ $t("rides.heading") }}</h2>

        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th class="title">{{ $t("rides.bustime") }} </th>
                    <th class="title">{{ $t("rides.name") }} </th>
                    <th class="title">{{ $t("rides.room") }} </th>
                </tr>
            </thead>
            <tbody>
                <template v-for="ride in sortedRides" :key="ride.id">
                    <!-- First row for each ride's users -->
                    <tr v-if="ride.patients && ride.patients.length > 0">
                        <td :rowspan="ride.users.length">{{ formatTime(ride.departure_time) }}</td>
                        <td>{{ ride.patients[0].name }}</td>
                        <td>{{ ride.patients[0].room }}</td>
                    </tr>
                    <!-- Subsequent rows for remaining users -->
                    <tr v-for="patient in ride.patients.slice(1)" :key="patient.id">
                        <td>{{ patient.name }}</td>
                        <td>{{ patient.room }}</td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            rides: []
        };
    },
    computed: {
        sortedRides() {
            return [...this.rides].sort((a, b) => {
                // Convert departure_time to Date objects for comparison
                const timeA = new Date(`1970-01-01T${a.departure_time}`);
                const timeB = new Date(`1970-01-01T${b.departure_time}`);
                return timeA - timeB; // Sort in ascending order
            });
        }
    },
    mounted() {
        this.fetchRides();
    },
    methods: {
        async fetchRides() {
            try {
                const response = await axios.get('http://localhost:8000/api/rides/today_no_desc');
                console.log('API Response:', response.data); // Log the API response
                this.rides = response.data;
            } catch (error) {
                console.error('Error fetching rides:', error);
            }
        },
        formatTime(time) {
            return time ? time.substring(0, 5) : '';
        },
    }
};
</script>

<style scoped>
.rides-today-container {
    padding: 20px;
}

.table {
    margin-top: 20px;
    font-size: 1.5rem;
}
</style>
