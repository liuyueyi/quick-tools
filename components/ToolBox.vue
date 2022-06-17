<template>
    <div class="item-list">
        <template v-for="(tool, index2) in item.list">
            <ToolItem
                      :tool="tool"
                      :category="item.title"
                      :category-path="item.path"
            />
        </template>
    </div>
</template>

<script>
import ToolItem from "./ToolItem";

export default {
    name: 'ToolBox',
    components: {
        ToolItem,
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
.item-list {
    display: grid;
    gap: 13px;
    grid-template-columns: repeat(auto-fill, minmax(285px, 1fr));
    justify-content: space-evenly;
}
</style>
