<template>
    <nav v-if="breadcrumbs.length" class="breadcrumb is-right" aria-label="breadcrumbs">
        <ul>
            <li v-for="(crumb, index) in breadcrumbs" :key="index" :class="{ 'is-active': isActive(index) }">
                <!-- If the crumb has a link, make it clickable; otherwise, just display the name -->
                <router-link v-if="crumb.link" :to="crumb.link"> {{ $t(`breadcrumbs.${crumb.name}`) }} </router-link>
                <span v-else> {{ $t(`breadcrumbs.${crumb.name}`) }} </span>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    computed: {
        breadcrumbs() {
            const route = this.$route;  // Get the current route

            // Return the breadcrumbs from the meta field
            return route.meta.breadcrumbs || [];
        }
    },
    methods: {
        isActive(index) {
            // Mark the last breadcrumb as active
            return index === this.breadcrumbs.length - 1;
        }
    }
};
</script>

<style scoped>
.breadcrumb {
    margin-bottom: 1rem;
    padding: 0 2rem;
}

.breadcrumb a,
.breadcrumb span {
    vertical-align: middle;
    display: inline-block;
    /* font-size: 1rem; */
    line-height: 1.5rem;
}

.breadcrumb ul {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.breadcrumb li {
    display: inline-flex;
    align-items: center;
}

.breadcrumb li::before {
    margin-right: 0.5em;
}

.breadcrumb li::after {
    margin-left: 0.5em;
    /* Add space before the separator */
}

.breadcrumb li:last-child::after {
    content: none;
}
</style>
