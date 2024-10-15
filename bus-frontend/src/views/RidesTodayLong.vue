<template>
    <div class="rides-today-container container">
        <h3 class="title is-3">{{ $t("rides.heading") }}</h3>

        <table v-if="rides.length > 0" class="table is-fullwidth">
            <thead>
                <tr>
                    <th>{{ $t("rides.bustime") }} </th>
                    <th>{{ $t("rides.name") }} </th>
                    <th>{{ $t("rides.room") }} </th>
                </tr>
            </thead>
            <tbody>
                <template v-for="ride in rides" :key="ride.id">
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

        <p v-else class="is-size-2 is-size-4-mobile">
            {{ $t("rides.noRides") }}
        </p>
    </div>
</template>

<script>
import axios from 'axios';
const apiUrl = process.env.VUE_APP_BACKEND_URL

export default {
    data() {
        return {
            rides: []
        };
    },
    mounted() {
        this.fetchRides();
    },
    methods: {
        async fetchRides() {
            try {
                const response = await axios.get(`${apiUrl}/api/rides/today_no_desc`);
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