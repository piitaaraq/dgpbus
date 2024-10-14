<template>
    <article v-if="!cookiesAccepted" class="message is-success">
        <div class="message-header">
            <p>{{ $t("cookies.header") }} </p>
            <button class="delete" aria-label="delete" @click="declineCookies"></button>
        </div>
        <div class="message-body">
            {{ $t("cookies.message") }}
            <router-link :to="{ name: 'PrivacyPage' }">{{ $t("cookies.readmore") }} </router-link>
            <div class="buttons mt-3">
                <button class="button is-success" @click="acceptCookies">{{ $t("cookies.accept") }} </button>
                <button class="button is-light" @click="declineCookies">{{ $t("cookies.decline") }} </button>
            </div>
        </div>
    </article>
</template>

<script>
export default {
    data() {
        return {
            cookiesAccepted: false,
        };
    },
    mounted() {
        this.cookiesAccepted = this.checkCookieConsent();
    },
    methods: {
        acceptCookies() {
            this.setCookie('cookies_accepted', 'true', 365);
            this.cookiesAccepted = true;
        },
        declineCookies() {
            this.cookiesAccepted = true;
        },
        setCookie(name, value, days) {
            let expires = '';
            if (days) {
                const date = new Date();
                date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
                expires = '; expires=' + date.toUTCString();
            }
            document.cookie = name + '=' + (value || '') + expires + '; path=/';
        },
        checkCookieConsent() {
            return document.cookie.split(';').some((item) => item.trim().startsWith('cookies_accepted='));
        },
    },
};
</script>

<style scoped>
.message {
    position: fixed;
    bottom: 20px;
    left: 20px;
    right: 20px;
    z-index: 9999;
    /* Ensure it's on top of the footer */

}

.buttons {
    justify-content: flex-end;
}
</style>
