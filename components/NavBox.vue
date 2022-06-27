<template>
    <div>
        <nya-container v-for="(sub_nav, index2) in item.sub_nav"
                       :title="sub_nav.title"
                       :icon="sub_nav.icon"
                       :key="'s_' + index2"
        >
            <template v-for="(tool, i) in sub_nav.list">
                <nav-item
                    :key="tool.name + '_st_' + index2"
                    :title="tool.name"
                    :desc="tool.name"
                    :to="tool.path"
                    :icon="tool.icon"
                    class="nya-btn"
                    :class="[tool.hot, {'badge': tool.hot}]"
                >
                </nav-item>
            </template>
        </nya-container>
    </div>
</template>
<script>
import NavItem from "./NavItem";
import Template from "../pages/tools/code/cdnjs";

export default {
    name: 'NavBox',
    components: {
        Template,
        NavItem,
    },
    props: {
        item: {
            type: Object,
            default: {}
        }
    }
};
</script>

<style lang="scss">
</style>
