<template>
    <div class="item" @click="toDetail">
        <div class="item-inner">
            <div class="item-hd">
                <nuxt-link :target="$store.state.setting.inNewTab ? '_blank' : '_self'" :to="tool.path"
                           class="item-icon">
                    <nya-icon :icon="tool.icon" style="width: 3em; height: 3em;" v-if="icoIcon()"></nya-icon>
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
                    <i v-if="collected" class="eva eva-star small-font" @click="collect"><var>取消</var> </i>
                    <i v-else class="eva eva-star-outline small-font" @click="collect"><var>收藏</var> </i>
                </a>
            </div>
            <div class="item-bd">
                <div v-if="tool.head.description !== null " class="item-desc dd"
                     :title="`${tool.head.description}`">
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
import _ from "lodash";

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
        collect() {
            const path = this.tool.path;
            if (path === '/') {
                return false;
            }
            let favorites = _.chain(this.$store.state.setting.favorites);
            let flag = favorites.indexOf(path).value();
            if (flag === -1) {
                favorites.push(path).value();
                this.$noty.success('收藏成功');
            } else {
                favorites.pull(path).value();
                this.$noty.success('取消收藏成功');
            }
            this.$store.commit('SET_STORE', {
                key: 'setting.favorites',
                value: favorites.value()
            });
        },
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
            if (this.tool.icon.startsWith("#icon")) {
                return true;
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
        },
        toDetail() {
            this.$router.push(this.tool.path);
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
