<template>
    <a :href="to" target="_blank">
        <img style="width:20px" :src="icon" v-show="icon" alt="desc"/>
        <span class="text">{{ title }}</span>
        <slot></slot>
    </a>
</template>
<script>

export default {
    props: {
        title: {
            type: String,
            default: '',
        },
        desc: {
            type: String,
            default: '',
        },
        to: {
            type: String,
            default: ''
        },
        icon: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="scss">
</style>
