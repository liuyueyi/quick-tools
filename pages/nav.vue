<template>
    <div class="home">
        <nya-container>
            <div class="card no-border card-panel" v-show="!searchText">
                <ul class="nav nav-tabs" data-bs-toggle="tabs">
                    <li v-for="(item, index) in tabList"
                        class="nav-item"
                        @click="chooseTab(item.tag)">
                        <a class="nav-link" :class="isTabActivated(item.tag) ? 'active' : ''" style="color: #212529"
                           data-bs-toggle="tab" :href="'/nav/#' + item.tag">{{ item.category }}</a>
                    </li>
                </ul>
                <div class="card-body">
                    <div class="tab-content">
                        <div class="tab-pane active show">
                            <div class="item-list">
                                <template v-for="(tool, index3) in this.itemList" class="item-list">
                                    <nav-box :item="tool">
                                    </nav-box>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nya-container>

<!--        &lt;!&ndash; 分类展示   &ndash;&gt;-->
<!--        <template v-show="!searchText">-->
<!--            <nya-container-->
<!--                v-for="(item, index) in $store.state.navs"-->
<!--                v-show="!searchText"-->
<!--                :key="index"-->
<!--                :icon="item.icon"-->
<!--                :title="item.title">-->
<!--                <nav-box :item="item">-->
<!--                </nav-box>-->

<!--            </nya-container>-->
<!--        </template>-->
    </div>
</template>

<script>
import isMobile from 'ismobilejs';
import NavItem from "../components/NavItem";
import NavBox from "../components/NavBox";
import Template from "./tools/code/cdnjs";

const DEFAULT_TAB = "recommend";
const DEFAULT_TAB_NAME = "精选";

export default {
    name: 'Home',
    components: {
        Template,
        NavItem,
        NavBox,
    },
    head() {
        return {
            title: this.title
        };
    },
    props: {},
    watch: {
        $route: {
            immediate: true,
            handler() {
                this.activeTab = this.getActiveTab();
            }
        },
    },
    data() {
        return {
            title: `${process.env.title} - ${process.env.description}`,
            searchText: '',
            activeTab: 'design',
            isMobile
        };
    },
    computed: {
        tabList() {
            let arr = [{
                category: DEFAULT_TAB_NAME,
                tag: DEFAULT_TAB,
            }];
            arr = [];
            this.$store.state.navs.forEach(tool => {
                arr.push({
                    category: tool.title,
                    tag: tool.tab,
                })
            });
            return arr;
        },
        itemList() {
            let arr = [];
            this.$store.state.navs.forEach(tool => {
                if (this.activeTab === DEFAULT_TAB) {
                    arr.push(tool)
                } else if (tool['tab'] === this.activeTab) {
                    arr.push(tool);
                }
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
        },
        isTabActivated(tabName) {
            // 判断当前tab页是否被选中
            return this.activeTab === tabName;
        },
        chooseTab(tabName) {
            // 选择某个分类对应的工具箱
            this.activeTab = tabName;
        },
        getActiveTab() {
            let tags = [DEFAULT_TAB];
            let hash = this.$route.hash;
            this.$store.state.navs.forEach(tool => {
                tags.push(tool.tab);
            });
            let choose = DEFAULT_TAB;
            for (let i = 0; i < tags.length; i++) {
                if (hash.indexOf('#' + tags[i]) >= 0) {
                    choose = tags[i];
                    break;
                }
            }
            return choose;
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
    .no-border {
        border: 0 solid #ced4da;
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
