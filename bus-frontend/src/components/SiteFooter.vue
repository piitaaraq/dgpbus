<template>
    <div class="container">
        <footer class="footer">
            <div class="container">
                <div class="columns">
                    <!-- First Column: Company Info -->
                    <div class="column">
                        <p>
                            <strong>Patientkørsel</strong> by <strong>Det grønlandske Patienthjem</strong>.
                        </p>
                        <p>
                            Address: Omøgade 3, 2100 København Ø <br />
                            Phone: +45 3826 4600 <br />
                            Email: <a :href="'mailto:'">dgpshv@peqqik.gl</a>
                        </p>
                    </div>

                    <!-- Second Column: Links -->
                    <div class="column">
                        <p>
                            <a @click="goToPrivacy">Privacy Policy</a> |
                            <a @click="goToAbout">About</a> |
                            License: <a href="https://opensource.org/licenses/MIT">MIT</a> <br>
                            <font-awesome-icon :icon="['fas', 'copyright']" /> {{ startYear }}{{ startYear !==
                                currentYear ?
                            ' - ' + currentYear : '' }} Det grønlandske Patienthjem
                        </p>
                    </div>
                </div>
            </div>
        </footer>

    </div>
</template>

<script>
export default {
    name: "AppFooter",
    data() {
        return {
            startYear: 2024, // Set your starting year
            currentYear: null,
        };
    },
    created() {
        this.getCurrentYear();
    },
    methods: {
        goToAbout() {
            this.$router.push({ name: 'AboutPage' });
        },
        goToPrivacy() {
            this.$router.push({ name: 'PrivacyPage' });
        },
        getCurrentYear() {
            const date = new Date();
            this.currentYear = date.getFullYear();
        },
    }
};
</script>

<style scoped>
.footer {
    padding: 20px;
    background-color: #ECF0F1;
    border-top: 1px solid #ddd;
}

.footer a {
    color: #3273dc;
    /* Adjust to your desired link color */
    text-decoration: none;
}

.footer a:hover {
    text-decoration: underline;
}
</style>
