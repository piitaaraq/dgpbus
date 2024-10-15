<template>
    <div class="bus-schedules-container container">
        <h2 class="title is-2">{{ $t("schedules.heading") }}</h2>

        <!-- Table for Departure Location 1 (Patienthjemmet) -->
        <div v-if="departureLocation1Schedules.length">
            <h3 class="title is-3">{{ $t("schedules.toRiget") }}</h3>
            <table class="table is-fullwidth is-striped mb-5">
                <thead>
                    <tr>
                        <th v-for="day in sortedDaysOfWeek" :key="day">{{ $t(`days.${day}`) }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="times in sortedGroupedSchedules(departureLocation1Schedules)" :key="times.id">
                        <td v-for="day in sortedDaysOfWeek" :key="day">{{ formatTime(times[day]) || '-' }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Table for Departure Location 2 (Rigshospitalet) -->
        <div v-if="departureLocation2Schedules.length">
            <h3 class="title is-3">{{ $t("schedules.toDgp") }}</h3>
            <table class="table is-fullwidth is-striped">
                <thead>
                    <tr>
                        <th v-for="day in sortedDaysOfWeek" :key="day">{{ $t(`days.${day}`) }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="times in sortedGroupedSchedules(departureLocation2Schedules)" :key="times.id">
                        <td v-for="day in sortedDaysOfWeek" :key="day">{{ formatTime(times[day]) || '-' }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
const apiUrl = process.env.VUE_APP_BACKEND_URL


export default {
    data() {
        return {
            schedules: [],
            departureLocation1Schedules: [],
            departureLocation2Schedules: [],
            daysOfWeek: ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag'] // Use keys for the days
        };
    },
    computed: {
        sortedDaysOfWeek() {
            return this.daysOfWeek;
        }
    },
    mounted() {
        this.fetchSchedules();
    },
    methods: {
        async fetchSchedules() {
            try {
                const response = await axios.get(`${apiUrl}/api/schedules/`);
                this.schedules = response.data;

                // Group schedules by departure location
                this.departureLocation1Schedules = this.schedules.filter(
                    schedule => schedule.departure_location === 'Patienthjemmet'
                );
                this.departureLocation2Schedules = this.schedules.filter(
                    schedule => schedule.departure_location === 'Rigshospitalet'
                );
            } catch (error) {
                console.error('Error fetching bus schedules:', error);
            }
        },
        groupedSchedules(schedules) {
            const scheduleMap = {};
            schedules.forEach(schedule => {
                const time = schedule.departure_time;
                if (!scheduleMap[time]) {
                    scheduleMap[time] = {};
                }
                scheduleMap[time][schedule.day_of_week] = time;
            });
            return Object.values(scheduleMap);
        },
        sortedGroupedSchedules(schedules) {
            const grouped = this.groupedSchedules(schedules);
            return grouped.sort((a, b) => {
                const timeA = Object.values(a).find(val => val) || '00:00:00'; // Fallback time if empty
                const timeB = Object.values(b).find(val => val) || '00:00:00';
                return new Date(`1970-01-01T${timeA}`) - new Date(`1970-01-01T${timeB}`);
            });
        },
        formatTime(time) {
            if (!time) return null;
            const date = new Date(`1970-01-01T${time}`);
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
    }
};
</script>

<style scoped>
.bus-schedules-container {
    padding: 20px;
}

.table {
    margin-top: 20px;
}
</style>
