<template>
    <div class="home">
        <Search v-model="searchText" @enter="enterFirst">
            <template slot-scope="data">
                <nuxt-link
                    v-for="(tool, index) in data.data"
                    v-show="showBtn(tool)"
                    :key="index"
                    :target="$store.state.setting.inNewTab ? '_blank' : '_self'"
                    :to="tool.path"
                    class="nya-btn"
                >
                    {{ tool.name }}
                </nuxt-link>
            </template>
        </Search>

        <!-- 分类展示   -->
        <template v-show="!searchText">
            <nya-container
                v-for="(item, index) in $store.state.navs"
                v-show="!searchText"
                :key="index"
                :icon="item.icon"
                :title="item.title">
                <template v-for="(tool, index2) in item.list">
                    <nav-item
                        v-if="showBtn(tool)"
                        :key="index2"
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
        </template>
    </div>
</template>

<script>
import isMobile from 'ismobilejs';
import NavItem from "../components/NavItem";

export default {
    name: 'Home',
    components: {
        NavItem,
    },
    head() {
        return {
            title: this.title
        };
    },
    props: {},
    data() {
        return {
            title: `${process.env.title} - ${process.env.description}`,
            searchText: '',
            isMobile
        };
    },
    computed: {
        toolsList() {
            let arr = [];
            this.$store.state.navs.forEach(tool => {
                arr = arr.concat(tool.list);
            });
            return arr;
        }
    },
    methods: {
        enterFirst(e) {
            window.open(e.path);
        },
        showSection(item) {
            return !(
                item.list.filter(i => {
                    return (
                        this.$store.state.setting.hide.indexOf(i.path) !== -1
                    );
                }).length === item.list.length
            );
        },
        showBtn(tool) {
            return this.$store.state.setting.hide.indexOf(tool.path) === -1;
        }
    }
};
</script>

<style lang="scss">
.home {
    span.mb {
        display: block;
        margin-bottom: 15px;
    }
    table {
        width: 100%;
        table-layout: auto;
    }

    ._ad {
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .nya-btn {
        position: relative;
        margin: 7px;
        width: calc(20% - 14px);
        text-align: center;
        box-sizing: border-box;
        overflow: hidden;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        transition: all 0.3s ease;
        background-color: transparent;
        font-size: 1.1em;
        border-radius: 4px;
        padding-top: 0.4em;
        padding-bottom: 0.4em;

        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 16px 0px rgba(10, 14, 29, 0.04),
            0px 8px 64px 0px rgba(10, 14, 29, 0.08);
        }

        @media (max-width: 1050px) {
            width: calc(25% - 14px);
        }
        @media (max-width: 900px) {
            width: calc(100% / 3 - 14px);
        }
        @media (max-width: 700px) {
            box-shadow: none;
            margin: 5px;
            width: calc(50% - 10px);
        }
    }

    .badge {
        &::after {
            content: '';
            position: absolute;
            top: 5px;
            right: 5px;
            color: #fff;
            font-weight: lighter;
            text-shadow: 1px 1px 1px rgba($color: #000000, $alpha: 0.2);
            width: 8px;
            height: 8px;
            border-radius: 50%;
        }

        &.new::after {
            background-color: var(--theme-success);
        }

        &.hot::after {
            background-color: var(--theme-danger);
        }

        &.vip::after {
            background-color: #f79817;
        }

        &.recommend::after {
            background-color: var(--theme);
        }
    }

    .badge-info {
        display: inline-flex;
        align-items: center;

        .badge {
            display: inline-flex;
            margin-right: 10px;
            align-items: center;

            &::after {
                position: relative;
                left: auto;
                margin-left: 10px;
                top: auto;
                display: inline-block;
            }
        }
    }
}
</style>
