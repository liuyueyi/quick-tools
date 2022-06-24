<template>
    <div class="home">
        <Welcome/>
        <Search v-model="searchText" @enter="enterFirst" v-show="!this.$store.state.setting.hideHomeSearch">
            <template slot-scope="data">
                <div class="item-list">
                    <template class="item-list" v-for="(tool, index2) in data.data">
                        <ToolItem
                            :tool="tool"
                            :category="tool.category"
                            :category-path="``"
                        />
                    </template>
                </div>
            </template>
        </Search>
        <Favorites v-show="!searchText && !this.$store.state.setting.hideHomeFavorite"/>

        <nya-container>
            <div class="card no-border card-panel" v-show="!searchText">
                <ul class="nav nav-tabs" data-bs-toggle="tabs">
                    <li v-for="(item, index) in tabList"
                        class="nav-item"
                        @click="chooseTab(item.tag)">
                    <span class="nav-link" :class="isTabActivated(item.tag) ? 'active' : ''"
                          data-bs-toggle="tab">{{ item.category }}</span>
                    </li>
                </ul>
                <div class="card-body">
                    <div class="tab-content">
                        <div class="tab-pane active show">
                            <div class="item-list">
                                <template v-for="(tool, index3) in this.itemList" class="item-list">
                                    <ToolItem
                                        :tool="tool"
                                        :category="tool.category"
                                        :category-path="``"
                                    />
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nya-container>
    </div>
</template>

<script>
import Favorites from '~/components/Favorites';
import Search from '~/components/Search';
import Welcome from '~/components/Welcome';
import ToolItem from "~/components/ToolItem";

export default {
    name: 'Home',
    components: {
        Favorites,
        Search,
        Welcome,
        ToolItem,
    },
    head() {
        return {
            title: this.title
        };
    },
    data() {
        return {
            title: `${process.env.title} - ${process.env.description}`,
            searchText: '',
            activeTab: 'all',
        };
    },
    computed: {
        toolsList() {
            let arr = [];
            this.$store.state.tools.forEach(tool => {
                tool.list.forEach(item => item['category'] = tool['title']);
                arr = arr.concat(tool.list);
            });
            return arr;
        },
        tabList() {
            let arr = [{
                category: "全部",
                tag: 'all',
            }];
            this.$store.state.tools.forEach(tool => {
                arr.push({
                    category: tool.title,
                    tag: tool.en_title,
                })
            });
            return arr;
        },
        itemList() {
            let arr = [];
            this.$store.state.tools.forEach(tool => {
                if (tool['en_title'] === this.activeTab || this.activeTab === 'all') {
                    tool.list.forEach(item => item['category'] = tool['title']);
                    arr = arr.concat(tool.list);
                }
            });
            return arr;
        }
    },
    methods: {
        enterFirst(e) {
            if (this.$store.state.setting.inNewTab) {
                window.open(e.path);
            } else {
                this.$router.push(e.path);
            }
        },
        showBtn(tool) {
            // 隐藏的工具栏不再显示
            return this.$store.state.setting.hide.indexOf(tool.path) === -1;
        },
        isTabActivated(tabName) {
            // 判断当前tab页是否被选中
            return this.activeTab === tabName;
        },
        chooseTab(tabName) {
            // 选择某个分类对应的工具箱
            this.activeTab = tabName;
            console.log("collected! +", tabName);
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

    .item-list {
        display: grid;
        gap: 13px;
        grid-template-columns: repeat(auto-fill, minmax(285px, 1fr));
        justify-content: space-evenly;
    }

    .no-border {
        border: 0 solid #ced4da;
    }

    .card-panel {
        margin-top: -2em;
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
        font-size: 18px;
        border-radius: 4px;

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

    .pay {
        width: 100%;
        padding: 0;
        margin: 0;
        display: flex;
        justify-content: space-around;

        li {
            margin: 0;
            list-style: none;
            padding: 10px;

            .name {
                text-align: center;
                font-size: 25px;
                font-weight: bold;
                margin-top: 5px;
            }

            img {
                width: 200px;
                max-width: 100%;
            }
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
