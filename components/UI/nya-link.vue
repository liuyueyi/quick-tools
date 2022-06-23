<template>
    <a v-if="httpUrl" :href="to" :target="$store.state.setting.inNewTab ? '_blank' : '_self'">
        <slot></slot>
    </a>
    <nuxt-link v-else :target="$store.state.setting.inNewTab ? '_blank' : '_self'" :to="to">
        <slot></slot>
    </nuxt-link>
</template>
<script>

export default {
    props: {
        to: {
            type: String,
            default: ''
        }
    },
    methods: {
        httpUrl() {
            return this.to.startsWith("http");
        }
    }
};
</script>

<style lang="scss">
</style>
