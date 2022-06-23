<template>
    <nya-container v-if="favorites.length" title="收藏夹" icon="star-outline">
        <nya-link
            v-for="(tool, index) in favorites"
            :key="index"
            :to="tool.path"
            class="nya-btn">
            <nya-icon :icon="tool.icon" style="width: 1.2em; height: 1.2em;" v-if="icoIcon(tool.icon)"></nya-icon>
            <i v-else-if="evaIcon(tool.icon)" :class="'eva eva-1x eva-' + tool.icon"></i>
            {{ tool.name }}
        </nya-link>
    </nya-container>
</template>

<script>
export default {
    name: 'Favorites',
    computed: {
        toolsList() {
            let arr = [];
            this.$store.state.tools.forEach(tool => {
                tool.list.forEach(item => item['category'] = tool['title']);
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
        evaIcon(icon) {
            return icon;

        },
        icoIcon(icon) {
            if (!icon) {
                return false;
            }
            return !!icon.startsWith("#icon");

        },
    }
};
</script>
