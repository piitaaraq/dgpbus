<template>
    <div class="rides-today-container container">
        <h3 class="title is-1">{{ $t("rides.heading") }}</h3>

        <table v-if="paginatedRides.length > 0" class="table is-fullwidth">
            <thead>
                <tr>
                    <th class="is-size-2 ">{{ $t("rides.bustime") }} </th>
                    <th class="is-size-2">{{ $t("rides.name") }} </th>
                    <th class="is-size-2">{{ $t("rides.room") }} </th>
                </tr>
            </thead>
            <tbody>
                <template v-for="ride in paginatedRides" :key="ride.id">
                    <tr v-if="ride.patients && ride.patients.length > 0">
                        <td class="is-size-4 " :rowspan="ride.patients.length">{{
                            formatTime(ride.departure_time) }}</td>
                        <td class="is-size-4">{{ ride.patients[0].name }}</td>
                        <td class="is-size-4">{{ ride.patients[0].room }}</td>
                    </tr>
                    <tr v-for="patient in ride.patients.slice(1)" :key="patient.id">
                        <td class="is-size-4">{{ patient.name }}</td>
                        <td class="is-size-4">{{ patient.room }}</td>
                    </tr>
                </template>
            </tbody>
        </table>

        <p v-else class="is-size-2 is-size-4-mobile">
            {{ $t("rides.noRides") }}
        </p>

        <!-- Pagination Controls -->
        <nav class="pagination is-small" role="navigation" aria-label="pagination">
            <button class="pagination-previous" @click="prevPage" :disabled="currentPage === 1">
                {{ $t("pagination.previous") }}
            </button>
            <button class="pagination-next" @click="nextPage" :disabled="currentPage === totalPages">
                {{ $t("pagination.next") }}
            </button>
            <ul class="pagination-list">
                <li v-for="page in totalPages" :key="page">
                    <button class="pagination-link" @click="setPage(page)"
                        :class="{ 'is-current': currentPage === page }">
                        {{ page }}
                    </button>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import axios from 'axios';
const apiUrl = process.env.VUE_APP_BACKEND_URL;

export default {
    data() {
        return {
            rides: [],
            currentPage: 1,
            rowsPerPage: 9,
            autoFlipInterval: null, // for auto pagination
            flipIntervalTime: 30000, // time in milliseconds between flips
        };
    },
    computed: {
        paginatedRides() {
            if (this.rides && this.rides.length > 0) {
                const start = (this.currentPage - 1) * this.rowsPerPage;
                const end = start + this.rowsPerPage;
                return this.rides.slice(start, end);
            }
            return []; // return empty array if rides is undefined or empty
        },
        totalPages() {
            return this.rides && this.rides.length > 0
                ? Math.ceil(this.rides.length / this.rowsPerPage)
                : 1; // Ensure totalPages is at least 1 to avoid issues
        }
    },
    mounted() {
        this.fetchRides();
        this.startAutoFlip();
    },
    beforeUnmount() {
        this.clearAutoFlip(); // Clear the interval when the component is unmounted
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
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            } else {
                this.currentPage = 1; // Go back to the first page
            }
            this.resetAutoFlip(); // Reset auto flip when navigating manually
        },
        setPage(page) {
            this.currentPage = page;
            this.resetAutoFlip(); // Reset auto flip when a page number is clicked
        },
        startAutoFlip() {
            // Automatically flip the pages every 30 seconds (or custom interval)
            this.autoFlipInterval = setInterval(() => {
                this.nextPage();
            }, this.flipIntervalTime);
        },
        clearAutoFlip() {
            // Clear the current interval if it exists
            if (this.autoFlipInterval) {
                clearInterval(this.autoFlipInterval);
            }
        },
        resetAutoFlip() {
            // Reset the auto flip by clearing and restarting the interval
            this.clearAutoFlip();
            this.startAutoFlip();
        }
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

.pagination {
    margin-top: 20px;
}
</style>
