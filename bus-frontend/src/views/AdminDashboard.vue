<template>
    <div class="admin-dashboard container">
        <h1 class="title">Personaleadgang</h1>

        <div class="dashboard-cards">
            <div class="card is-info" @click="goToTodayRides">
                <div class="card-content">
                    <p class="title">Dagens kørsler</p>
                    <p>Vis alle kørsler for i dag</p>
                </div>
            </div>

            <div class="card is-primary" @click="goToBusSchedules">
                <div class="card-content">
                    <p class="title">Køreplaner for bussen</p>
                    <p>Vis køreplaner fra patienthjemmet og Rigshospitalet</p>
                </div>
            </div>

            <div class="card" @click="goToTaxiUsers">
                <div class="card-content">
                    <p class="title">Patienter til andre hospitaler</p>
                    <p>Vis de patienter der har aftaler andre steder end Rigshospitalet</p>
                </div>
            </div>

            <div class="card" @click="goToRegisteredRides">
                <div class="card-content">
                    <p class="title">Registrerede aftaler og kørsler</p>
                    <p>Vis og rediger lægetider</p>
                </div>
            </div>

            <div class="card" @click="goToDriverView">
                <div class="card-content">
                    <p class="title">For buschaufføren</p>
                    <p>Vis og bekræft passagerer</p>
                </div>
            </div>

            <div class="card" @click="goTranslatorView">
                <div class="card-content">
                    <p class="title">For tolke</p>
                    <p>Vis patienter der har brug for tolk</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        goToTodayRides() {
            this.$router.push({ name: 'RidesToday' });
        },
        goToBusSchedules() {
            this.$router.push({ name: 'BusSchedules' });
        },
        goToTaxiUsers() {
            this.$router.push({ name: 'TaxiUsers' });
        },
        goTranslatorView() {
            this.$router.push({ name: 'TranslatorView' });
        },
        goToRegisteredRides() {
            this.$router.push({ name: 'RegisteredRides' });
        },
        goToDriverView() {
            this.$router.push({ name: 'DriverView' });
        }
    }
};
</script>

<style scoped>
.admin-dashboard {
    padding: 20px;
}

.dashboard-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.card {
    flex: 1;
    min-width: 250px;
    height: 170px;
    cursor: pointer;
    /* background-color: #f4f4f4; */
    background-color: #f4f4f4;
    border-radius: 8px;
    transition: background-color 0.2s;
}

.card:hover {
    background-color: #e0e0e0;
}

.card-content {
    padding: 20px;
}

.card .title {
    font-size: 1.5rem;
}
</style>
