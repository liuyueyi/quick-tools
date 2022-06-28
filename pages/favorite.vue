<template>
    <div class="home">
        <nya-container v-if="favorites.length" title="收藏夹" icon="star-outline">
            <div class="item-list">
                <template  v-for="(tool, index2) in favorites" class="item-list">
                    <ToolItem
                        :tool="tool"
                        :category="tool.category"
                        :category-path="tool.tab"
                    />
                </template>
            </div>
        </nya-container>
        <nya-panel v-else title="收藏夹" text="暂无收藏项，快到工具箱去收藏喜欢的小工具吧~">

        </nya-panel>
    </div>
</template>

<script>
import Favorites from '~/components/Favorites';
import Template from "./tools/code/cdnjs";
import ToolItem from "../components/ToolItem";

export default {
    name: 'Home',
    components: {
        Template,
        ToolItem,
        Favorites,
    },
    head() {
        return {
            title: this.title
        };
    },
    computed: {
        toolsList() {
            let arr = [];
            this.$store.state.tools.forEach(tool => {
                tool.list.forEach(item => {
                    item['category'] = tool['title'];
                    item['tab'] = tool['tab'];
                });
                arr = arr.concat(tool.list);
            });
            return arr;
        },
        favorites() {
            let results = [];
            this.toolsList.forEach(tool => {
                if (
                    this.$store.state.setting.favorites.indexOf(tool.path) !==
                    -1
                )
                    results.push(tool);
            });
            return results;
        }
    },
    methods: {
    }
};
</script>

<style lang="scss">
.home {
    .item-list {
        display: grid;
        gap: 13px;
        grid-template-columns: repeat(auto-fill, minmax(285px, 1fr));
        justify-content: space-evenly;
    }
}
</style>
