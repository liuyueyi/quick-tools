<template>
    <div class="item">
        <div class="item-inner">
            <div class="item-hd">
                <nuxt-link :target="$store.state.setting.inNewTab ? '_blank' : '_self'" :to="tool.path"
                           class="item-icon">
                    <i v-if="icoIcon()" :class="'icofont-3x ' + tool.icon"></i>
                    <i v-else-if="evaIcon()" :class="'eva eva-3x eva-' + tool.icon"></i>
                </nuxt-link>
                <h3>
                    <nuxt-link class="item-link"
                               :target="$store.state.setting.inNewTab ? '_blank' : '_self'"
                               :to="tool.path"> {{ tool.name }}
                    </nuxt-link>
                </h3>
                <span v-if="category" class="item-category mid-font">
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
                <div v-if="tool.head.description !== null " class="item-desc dd" :title="`${tool.head.description}`">
                    {{ getDesc(tool.head.meta, tool.name) }}
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
    },
    methods: {
        evaIcon() {
            if (!this.tool.icon) {
                return false;
            }
            return true;
        },
        icoIcon() {
            if (!this.tool.icon) {
                return false;
            }
            if (this.tool.icon.startsWith("icofont")) {
                return false;
            }
            return false;
        },
        getDesc(meta, defaultVal) {
            for (let i = 0; i < meta.length; i++) {
                const target = meta[i];
                if (target.hid === 'description') {
                    return target['description'];
                }
            }
            return defaultVal;
        }
    }
};

</script>

<style lang="scss">

.item {
    border: 1px solid #ccc;
    position: static;
    border-radius: 4px;
    transition: box-shadow .3s ease-in-out;

    .item-inner {
        padding: 10px 15px 10px 8px;
        position: relative;

        a {
            color: #333;
            display: inline-block;
            // 无下划线
            text-decoration: none;
        }

        .item-btn {
            display: inline-block;
            padding: 3px 12px;
            text-decoration: none;
            position: relative;
        }
        h3 {
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
            color: #333;
            max-width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-decoration: none;
        }


        .small-font {
            font-size: 0.5em;
        }

        .mid-font {
            font-size: 0.8em;
        }
    }
}
</style>
