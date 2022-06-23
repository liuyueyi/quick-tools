<template>
    <svg class="icon" aria-hidden="true">
        <use v-bind:xlink:href="icon"/>
    </svg>
</template>

<script>
if (process.browser) {
    require('../../assets/fonts/iconfont/iconfont');
}
export default {
    props: {
        icon: {type: String, default: ''},
    }
};
</script>

<style lang="scss">
</style>
