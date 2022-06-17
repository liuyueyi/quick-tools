<template>
    <div class="item">
        <div class="item-inner">
            <div class="item-hd">
                <nuxt-link :target="$store.state.setting.inNewTab ? '_blank' : '_self'" :to="tool.path"
                           class="item-icon">
                    <i v-if="tool.icon" :class="'eva eva-3x eva-' + tool.icon"></i>
                </nuxt-link>
                <h3>
                    <nuxt-link class="item-link"
                               :target="$store.state.setting.inNewTab ? '_blank' : '_self'"
                               :to="tool.path"> {{ tool.name }}
                    </nuxt-link>
                </h3>
                <span class="item-category mid-font">
                    [<nuxt-link :target="$store.state.setting.inNewTab ? '_blank' : '_self'"
                                :to="categoryPath" rel="nofollow">{{
                        category
                    }}</nuxt-link>]</span>
                <a title="收藏" class="collectable collect" href="javascript:;" data-url="/">
                    <i v-if="collected" class="eva eva-star small-font"><var>取消</var> </i>
                    <i v-else class="eva eva-star-outline small-font"><var>收藏</var> </i>
                </a>
            </div>
            <div class="item-bd">
                <div v-if="tool.head.description" class="item-desc" :title="`${tool.head.description}`">
                    {{ tool.head.description }}
                </div>
                <div v-else class="item-desc" :title="`${tool.name}`">{{ tool.name }}</div>
            </div>
            <div class="item-ft">
                <nuxt-link class="item-link small-font"
                           :target="$store.state.setting.inNewTab ? '_blank' : '_self'"
                           :to="tool.path"> {{ tool.path }}
                </nuxt-link>
                <nuxt-link class="item-btn small-font"
                           :target="$store.state.setting.inNewTab ? '_blank' : '_self'"
                           :to="tool.path"> 进入
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Panel',
    props: {
        tool: {
            type: Object,
            default: {}
        },
        category: {
            type: String,
            default: ''
        },
        categoryPath: {
            type: String,
            default: '/'
        }
    },
    computed: {
        collected() {
            let flag = this.$store.state.setting.favorites.indexOf(this.tool.path);
            return flag !== -1;
        },
    }
};

</script>

<style lang="scss">

.item {
    border: 1px solid #ccc;
    position: static;
    border-radius: 4px;
    transition: box-shadow .3s ease-in-out;
}

.item-inner {
    padding: 10px 15px 10px 8px;
    position: relative;
}

.item h3 {
    font-size: 16px;
    font-weight: 700;
    margin: 0;
    line-height: 1.4;
    margin-bottom: 5px;
    height: 22px;
    overflow: hidden;
}

.item-ft {
    text-align: right;
}

.item-desc {
    margin-top: 8px;
    padding: 10px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.item-icon {
    float: left;
    margin-right: 10px;
    width: 48px;
    height: 48px;
    font-size: 0.9em;
}

.item-category {
    float: right;
}

.item-link {
    float: left;
    margin-top: 3px;
    color: #999;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.item a {
    color: #333;
    display: inline-block;
    // 无下划线
    text-decoration: none;
}

a.item-btn {
    display: inline-block;
    padding: 3px 12px;
    text-decoration: none;
    position: relative;
}

.small-font {
    font-size: 0.5em;
}

.mid-font {
    font-size: 0.8em;
}
</style>
