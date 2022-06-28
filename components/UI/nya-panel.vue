<template>
    <div class="card top-margin-1em"
         :class="{ 'transparent': $store.state.setting.bg.type !== 'none' && $store.state.setting.bg.transparentEl, 'pt': title }">
        <div class="card-header" v-if="head">
            {{ head }}
        </div>
        <div class="card-body">
            <h5 class="card-title" v-if="title">{{ title }}</h5>
            <slot v-else name="title"></slot>
            <h6 class="card-subtitle mb-2 text-muted" v-if="subTitle">{{ subTitle }}</h6>
            <slot v-else name="subTitle"></slot>

            <p class="card-text" v-show="text">{{ text }}</p>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        head: {type: String, default: ''},
        title: {
            type: String,
            default: ''
        },
        subTitle: {
            type: String, default: '',
        },
        text: {type: String, default: ''}
    }
};
</script>

<style lang="scss">
</style>
