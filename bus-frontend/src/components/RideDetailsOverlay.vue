<template>
    <div class="overlay" v-if="ride">
        <div class="overlay-content">
            <!-- Close button -->
            <button class="close-btn" @click="closeOverlay"><font-awesome-icon
                    :icon="['fas', 'circle-xmark']" /></button>

            <!-- Passenger check-off details -->
            <h3 class="title is-4">{{ $t("driver.passengersHeading") }}</h3>
            <table class="table is-fullwidth">
                <thead>
                    <tr>
                        <th>{{ $t("driver.name") }}</th>
                        <th>{{ $t("driver.room") }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="patient in ride.patients" :key="patient.id">
                        <td>{{ patient.name }}</td>
                        <td>{{ patient.room }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: {
        ride: {
            type: Object,
            required: true
        }
    },
    methods: {
        closeOverlay() {
            this.$emit('close');
        },
        async toggleStatus(patient) {
            try {
                const token = sessionStorage.getItem('token');
                const response = await axios.patch(`http://localhost:8000/api/rides/${patient.id}/toggle_status/`, {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                patient.status = response.data.status;
            } catch (error) {
                console.error('Error toggling status:', error);
            }
        }
    }
};
</script>

<style scoped>
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.overlay-content {
    position: relative;
    background: white;
    padding: 20px;
    border-radius: 10px;
    max-width: 600px;
    width: 100%;
}

.close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
}
</style>
