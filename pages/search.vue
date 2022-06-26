<template>
    <no-ssr>
        <div class="home">
            <Search v-model="searchText" @enter="enterFirst">
                <template slot-scope="data">
                    <div class="item-list">
                        <template class="item-list" v-for="(tool, index2) in data.data">
                            <ToolItem
                                :tool="tool"
                                :category="tool.category"
                                :category-path="tool.tab"
                            />
                        </template>
                    </div>
                </template>
            </Search>
        </div>
    </no-ssr>
</template>

<script>
import Search from '~/components/Search';
import ToolItem from '~/components/ToolItem';
import isMobile from "ismobilejs";

export default {
    name: 'Home',
    components: {
        Search,
        ToolItem,
    },
    head() {
        return {};
    },
    data() {
        return {
            title: `${process.env.title} - ${process.env.description}`,
            searchText: this.$route.query.key,
            isMobile
        };
    },
    // 不要 mounted 方法，否则生成环境可能出现 OMException: Failed to execute 'appendChild' on 'Node': This node type does
    methods: {
        enterFirst(e) {
            if (this.$store.state.setting.inNewTab) {
                window.open(e.path);
            } else {
                this.$router.push(e.path);
            }
        },
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
