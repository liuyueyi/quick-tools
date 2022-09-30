<template>
    <nya-container :title="title" :icon="icon">
        <ul class="nya-list">
            <li>
                该工具所有功能直接在浏览器端完成，无服务端交互，不会收集任何数据，请放心使用
            </li>
            <template>
                <slot></slot>
            </template>
        </ul>
    </nya-container>
</template>

<script>
import Template from "../../pages/tools/code/cdnjs";

export default {
    components: {Template},
    props: {
        title: {type: String, default: ''},
        icon: {
            type: String,
            default: 'bulb-outline'
        }
    }
};
</script>

<style lang="scss">
</style>
